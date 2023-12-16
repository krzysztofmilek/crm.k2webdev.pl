const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Token = require("../models/TokenModel");
const fs = require("fs");
const pdf = require("pdf-creator-node");
var path = require("path");
/* const options = require("./helpers/options"); */
var Handlebars = require('handlebars');



module.exports = async (user, mailType) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "mydevil.net",
      host: "mail57.mydevil.net",
      port: 587,
      secure: false,
      auth: {
        user: "send@k2webdev.pl",
        pass: "Send1mail",
      },
    });

    let emailContent, mailOptions;
    if (mailType == "sendOffer") {
       emailContent = `<h4>
       Szanowny Panie/Pani ${user.data.customer.name}. </h4
      <h5>W załączeniu przesyłam ofertę handlową na samochód marki
       ${user.data.car.make}   ${user.data.car.model}   ${user.data.car.version} Skrzynia biegów:  ${user.data.car.gearbox}  poj.: ${user.data.car.engine_capacity}   ${user.data.car.engine_power}KM </h5>
      
      Z poważaniem
      ${user.data.user.name}`;
      
      Handlebars.registerHelper('addCarPrice', function(a, b ) {
        a = a || 0;
        b = b || 0;
        return parseInt(a) - parseInt(b)
      });

      Handlebars.registerHelper('addDop', function(a, b, c ) {
        a = a || 0;
        b = b || 0;
        c = c || 0;
        return parseInt(a) + parseInt(b)+ parseInt(c);
      });

      Handlebars.registerHelper('addAllPrice', function(a, b, c, d, e ) {
        a = a || 0;
        b = b || 0;
        c = c || 0;
        d = d || 0;
        e = e || 0;
        return parseInt(a) + parseInt(b)+ parseInt(c) + parseInt(d) - parseInt(e);
      });

      Handlebars.registerHelper('parseInt', function(str) {
        return parseInt(str);
      });

      Handlebars.registerHelper('shortString', function(str) {
        return (str.slice(0,10));
      });

      var options = {
        formate: 'A3',
        orientation: 'portrait',
        border: '2mm',
        header: {
            height: '15mm',
            contents: {first : `<p class="headerText">Wrocław ${user.data.data.slice(0,10)}</p>`,
                }
            
        },
        footer: {
            height: '20mm',
            contents: {
          /*       first: 'Cover page',
                2: 'Second page {{page}}</span>/<span>{{pages}}', 
                 last: 'Last Page'*/
                default: `<span> <table style="width:75%; border: 10px ;"><tr><td colspan="2" class="footerText" style="width:30%"><b>${user.company.nameCompany}</b><br /><hr /></td></tr><td style="width:50%" class="footerText">ul. ${user.company.streetAdress} ${user.company.zipAdress}, ${user.company.cityAdress}} </td><td style="width:50%" class="footerText">REGON: ${user.company.REGON}, NIP${user.company.NIP} Konto: ${user.company.bankAccount}</td></tr></tr><td style="width:50%" class="footerText"> Tel.: ${user.company.phoneCompany}, Email :${user.company.emailCompany}</td><td style="width:50%" class="footerText">${user.company.siteWWW}</td></tr><tr><td></td><td style="color: #444; font-size: 8px; text-align: right">STRONA {{page}}/{{pages}}</td></tr></table>`, 
                
            }
        }
    };

      var html = fs.readFileSync(
        path.join(__dirname, "./template.html"),
        "utf8"
      );
      var document = {
        html: html,
        data: {
          user,
        },
       
        path: `D:/0000001 react crm/server/public/import/offers/${user.data.fileName}`,
        type: "", // "stream" || "buffer" || "" ("" defaults to pdf)
      };

      pdf
        .create(document, options)
        .then((res) => {
          console.log("Dokument utworzono", user);
         /*  fs.unlink(`D:/0000001 react crm/server/public/import/offers/${user.data.fileName}`, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('File is deleted.');
            }
          }); */
        })
        .catch((error) => {
          console.error(error);
        });
      mailOptions = {
        from: "K2WEBDEV",
        to: `${user.data.customer.email}`,
        subject: "Oferta handlowa",
        html: emailContent,
        attachments: [
          {
            filename: `${user.data.fileName}`,
            path: `D:/0000001 react crm/server/public/import/offers/${user.data.fileName}`,
          },
        ],
      };
    
    } else {
      const ecryptToken = bcrypt
        .hashSync(user._id.toString(), 10)
        .replaceAll("/", "");
      const token = new Token({ user_id: user._id, token: ecryptToken });
      console.log("ecry : ", ecryptToken);
      await token.save();
      {
        /* <a href="http://www.crm.k2webdev.pl/resetpass/${ecryptToken}">${ecryptToken}</a></h4>`; 
przeklejoć w miejsce 13 wierszy niżej*/
      }

      if (mailType == "verify") {
        emailContent = `<h4>Otrzymujesz tego maila ponieważ zarejetrowałeś się na MERN AUTH.
    Aby potwierdzić rejestrację proszę klinąć w poniższy link. <br />
    <a href="http://crm.k2webdev.pl/verify/${ecryptToken}">${ecryptToken}</a></h4>`;
        mailOptions = {
          from: "Registration MERN AUTH Mailer - send@k2webdev.pl",
          to: user.email,
          subject: "Weryfikacja adresu e-mail",
          html: emailContent,
        };
      } else {
        emailContent = `<h4>Kliknija aby zmienić hasło<br />
          <a href="http://www.crm.k2webdev.pl/resetpassword/${ecryptToken}">${ecryptToken}</a></h4>`;
        mailOptions = {
          from: "Registration MERN AUTH Mailer - send@k2webdev.pl",
          to: user.email,
          subject: "MERN AUTH - Reset hasła",
          html: emailContent,
        };
      }
    }

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
  }
};
