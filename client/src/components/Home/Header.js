import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileIcon from "../../images/profile-icon.png";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import axios from "axios";
import Avatar from "../../images/default-avatar.png";
import { useSession } from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "../../redux/features/auth/authApi";
import {toast, Toaster} from "react-hot-toast"
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import Logo from "../../images/logo3.png"
const Header = () => {
 
  const user = useSelector((state) => state.auth.user);
  console.log(user.name);

  const {data:userData, isLoading, refetch} = useLoadUserQuery(undefined, {})
  const [logout, setLogout] = useState(false)
  const {isSuccess, error} = useLogOutQuery(undefined, {
    skip : !logout ? true : false
  });

  const [pageTitle, setPageTitle] = useState("ELearning");
  useEffect(() => {
    if (user) {
      setPageTitle(`${user.name} Profile`);
    } else {
      setPageTitle("ELearning");
    }
    document.title = pageTitle;
    console.log(pageTitle)
  }, [user, pageTitle]);
  
  // const { data } = useSession();
  // console.log(data);
  // const [socialAuth, { isSuccess, error }] = useSocialAuthMutation();
  // useEffect(() => {
  //   if (!user) {
  //     if (data) {
  //       socialAuth({
  //         email: data?.user?.email,
  //         name: data?.user?.name,
  //         avatar: data?.user?.image,
  //       });
  //     }
  //   }
  //   if(data === null){
      //   if(isSuccess){
      //  toast.sucess("Successfully LoggedIn!")
      //   }

  //   }
  // if(data === null){
    //  setLogout(true);

  // }
  // }, [data, user]);
  const [mobNavOpen, setMobNavOpen] = useState(false);
 
  const toggleSidebar = () => {
    setMobNavOpen(!mobNavOpen);
  };

  const handleCloseSidebar = () => {
    setMobNavOpen(false);
  };
  return (
    <>
      <div className="header">
        <div className="sticky navbar top-0">
          <Toaster/>
          <nav className="bottom-nav">
            <div className="mobile-left-nav">
              <div className="side-navbar">
                <div className="side-navbar-icons">
                  <i
                    className="fa-solid fa-bars fa-2xl"
                    onClick={toggleSidebar}
                  ></i>
                </div>
              </div>
              <div className="left-nav">
                <div style={{width : "200px", height : "auto"}}>
                <img src={Logo} alt="" className="" style={{width : "100%", height : "100%"}}/>
                </div>
              
              </div>
            </div>
         

            <div className="center-nav d-flex align-items-center justify-content-end">
              <ul>
                <li>
                  <Link to="/">Office</Link>
                </li>
                <li>
                  <Link to="/courses">Courses</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/policy">Policy</Link>
                </li>
                <li>
                  <Link to="/contactus">Contact Us</Link>
                </li>
              </ul>
              <div className="nav-item">
  <div className="profile-icon">
    {user ? (
      user.role === "admin" ? (
        <Link to="/admin">
          <img src={user?.avatar?.url ? user.avatar.url : Avatar} />
        </Link>
      ) : user.role === "instructor" ? (
        <Link to="/instructor">
          <img src={user?.avatar?.url ? user.avatar.url : Avatar} />
        </Link>
      ) : (
        <Link to="/profile">
          <img src={user?.avatar?.url ? user.avatar.url : Avatar} />
        </Link>
      )
    ) : (
      <Link to="/login">
        <img src={ProfileIcon} alt="" />
      </Link>
    )}
  </div>
</div>

              
            </div>

           
          </nav>
        </div>
      </div>

      <div className={`mobNav ${mobNavOpen ? "open" : ""}`}>
        <nav>
          <div className="logoAndCancelBtn">
            <div className="logoDiv">
            <div style={{width : "150px", height : "auto"}}>
                <img src={Logo} alt="" className="" style={{width : "100%", height : "100%"}}/>
                </div>
            </div>
            <div className="cancelDiv">
              <i
                className="fa-solid fa-xmark fa-2xl"
                onClick={handleCloseSidebar}
              ></i>
            </div>
          </div>
          <ul className="mob-items">
            <li className="mob-item">
              <Link className="navLink" to="/" onClick={handleCloseSidebar}>
                Home
              </Link>
            </li>
            <li className="mob-item">
              <Link
                className="navLink"
                to="/courses"
                onClick={handleCloseSidebar}
              >
                Courses
              </Link>
            </li>
            <li className="mob-item">
              <Link
                className="navLink"
                to="/about"
                onClick={handleCloseSidebar}
              >
                About
              </Link>
            </li>
            <li className="mob-item">
              <Link
                className="navLink"
                to="/policy"
                onClick={handleCloseSidebar}
              >
                Policy
              </Link>
            </li>
            <li className="mob-item">
              <Link
                className="navLink"
                to="/contactus"
                onClick={handleCloseSidebar}
              >
                Contact Us
              </Link>
            </li>
        
          </ul>
        </nav>
      </div>

      
    </>
  );
};

export default Header;
