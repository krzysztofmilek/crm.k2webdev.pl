const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Token = require("../models/TokenModel");
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
      ${user.data.user.name}  
      `;

      mailOptions = {
        from: "K2WEBDEV",
        to: `${user.data.customer.email}`,
        subject: "Oferta handlowa",
        html: emailContent,
        attachments: [
          {
            filename: `${user.data.fileName}`,
            path: `D:/0000001 react crm/server/public/offers/${user.data.fileName}`,
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
