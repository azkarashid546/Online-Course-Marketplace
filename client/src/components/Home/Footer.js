import React from "react";
import {Link} from "react-router-dom"
const Footer = () => {
  return (
    <>
    <div className="pt-4 mt-5" style={{borderTop : "1px solid gray"}}>
    <div className="container footer">
        <div className="row my-5">
          <div className="col-md-3">
            <h5 className="text-white">About</h5>
            <div className="text-white"><Link to="/about" style={{fontSize : "16px", color : "#D4D4D2"}}>Our Story</Link></div>
            <div className="text-white"><Link to="/policy"style={{fontSize : "16px", color : "#D4D4D2"}}>Privacy Policy</Link></div>
            <div className="text-white"><Link to="/contactus" style={{fontSize : "16px", color : "#D4D4D2"}}>Contact Us</Link></div>
            </div>
          <div className="col-md-3">
            <h5 className="text-white">Quick Links</h5>
            <div className="text-white"><Link to="/courses" style={{fontSize : "16px", color : "#D4D4D2"}}>Courses</Link></div>
            <div className="text-white"><Link to="/profile"style={{fontSize : "16px", color : "#D4D4D2"}}>My Account</Link></div>
            <div className="text-white"><Link to="/dashboard" style={{fontSize : "16px", color : "#D4D4D2"}}>Course Dashboard</Link></div>
            </div>
          <div className="col-md-3">
          <h5 className="text-white">Quick Links</h5>
            <div className="text-white"><Link to="https://www.youtube.com/channel/UCb8mVQiLl4MNWeWVunvhvyg" style={{fontSize : "16px", color : "#D4D4D2"}}>Youtube</Link></div>
            <div className="text-white"><Link to="https://www.instagram.com/azkarashid04?utm_source=qr&igsh=OWZrbDhyNzM5MHJ0" style={{fontSize : "16px", color : "#D4D4D2"}}>Instagram</Link></div>
            <div className="text-white"><Link to="https://github.com/azkarashid546" style={{fontSize : "16px", color : "#D4D4D2"}}>Github</Link></div>
          </div>
          <div className="col-md-3">
          <h5 className="text-white">Contact Us</h5>
            <div style={{fontSize : "16px", color : "#D4D4D2"}}>Call Us +92 305 5358098</div>
            <div style={{fontSize : "16px", color : "#D4D4D2"}}>Address Lalazar Canal View House # 312</div>
            <div style={{fontSize : "16px", color : "#D4D4D2"}}>Email Us <Link to="mailto:azkarashid196@gmail.com" style={{fontSize : "14px", color : "#D4D4D2"}}> azkarashid196@gmail.com</Link></div>
          </div>
        </div>
      </div>
    </div>
     <div className="py-2" style={{borderTop : "1px solid gray"}}>
         <div className="d-flex align-items-center justify-content-center">
            <p className="text-white" style={{fontSize : "18px"}}>
                Copyright © 2024 ELearning. All rights reserved.
            </p>
         </div>
     </div>
    </>
  );
};

export default Footer;
