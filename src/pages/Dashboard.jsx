import React from "react";
import "../styles/dashboard.css";
import logo from '../assets/images/logo.png';


const Dashboard = () => {
  return (
  
          <div className ="Text">
            <img className="dd" src={logo} alt='some value'/> 
            <div className ="header">
            <h1 className="header2">โครงการอนุรักษ์พันธุกรรมพืชอันเนื่องมาจากพระราชดำริ</h1>
            <h1 className="header3">สมเด็จพระเทพรัตนราชสุดาฯ สยามบรมราชกุมาร</h1>
            <h4 className="header4">วิทยาลัยชัยบาดาลพิพัฒน์ มหาวิทยาลัยราชภัฏพระนครอำเภอชัยบาดาล จังหวัดลพบุรี</h4>
            </div>
    </div>
          

  );
};

export default Dashboard;
