import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Print.css";

export const FooterPrint = (props) => {
  const [company, setCompany] = useState([]);

  const getCompany = async () => {
    const data = await axios.get(process.env.REACT_APP_LOCALHOST+"company/");
    setCompany(data.data[0]);
  };
  useEffect(() => {
    getCompany();
    //eslint-disable-next-line
  }, []);
  return (
    <div >
        
        <div >KONTAKT DO HANDLOWCA</div>
        <hr />
        <div className="boldPrint">{props.user.name}</div>
        <div className="">{props.user.position}</div>
        <div className="">Tel. : {props.user.phone}</div>
        <div >Email : {props.user.email}</div>
        <br />
        <div className="boldPrint">{company.nameCompany}</div>
     
        <div>ul. {company.streetAdress}, {company.zipAdress} {company.cityAdress}
        </div>
        <div>e-mail : {company.emailCompany}</div>
        <div>tel. {company.phoneCompany}</div>
       {/*  <div>tel. {company.phoneDepartment}</div> */}
        <div>NIP : {company.NIP}, REGON : {company.REGON}</div>
        <div>nr konta : {company.bankAccount}</div>
        <div>{company.siteWWW}</div>
            
    </div>
  );
};
