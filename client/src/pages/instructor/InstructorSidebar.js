import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../../images/default-avatar.png";
import { useSelector } from "react-redux";
import { useLogOutQuery } from "../../redux/features/auth/authApi";
import toast, { Toaster } from "react-hot-toast";
import { signOut } from "next-auth/react";
import { useNavigate } from "react-router-dom";

const InstructorSidebar = ({ isOpen, toggleSidebar }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };
  let navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  const [avatar, setAvatar] = useState(null);

  const [logout, setLogout] = useState(false);
  const { isSuccess, error } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
   
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout Successfully!");
     
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error]);
  return (
    <>
      <Toaster />
     
        <aside id="sidebar" className={isExpanded ? "expand" : ""}>
          <div className="d-flex">
            <button className="toggle-btn" type="button" onClick={handleToggle}>
              <i className="lni lni-grid-alt"></i>
            </button>
            <div className="sidebar-logo">
              <Link to="/">ELEARNING</Link>
            </div>
          </div>

          <li className="sidebar-item-image">
            <div className="admin-image">
              <img
                src={user.avatar ? user?.avatar?.url : Avatar}
                alt="User Avatar"
              />
            </div>
            <div className="user-name mt-4">
              <h4 className="text-white">{user.name}</h4>
            </div>
            <div className="user-role">
              <h6 className="text-white" style={{ fontSize: "20px" }}>
                {" "}
                ~{user.role}
              </h6>
            </div>
          </li>

          <ul className="sidebar-nav">
            <li className="sidebar-item">
              <Link to="/instructor" className="sidebar-link">
                <i className="fa-solid fa-house"></i>
                <span>Profile</span>
              </Link>
            </li>
           
            <li className="sidebar-item">
              <div
                className="sidebar-link has-dropdown collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#courses"
                aria-expanded="false"
                aria-controls="courses"
              >
                <i className="fa-brands fa-discourse"></i>
                <span>Courses</span>
              </div>
              <ul
                id="courses"
                className="sidebar-dropdown list-unstyled collapse mx-4"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <Link to="/instructor/create-courses" className="sidebar-link">
                    <i className="fa-solid fa-plus"></i>
                    <span> Create Courses</span>
                  </Link>
                </li>
                <li className="sidebar-item">
                  <Link to="/instructor/all-courses" className="sidebar-link">
                    <i className="fa-solid fa-globe"></i>
                    <span>Live Courses</span>
                  </Link>
                </li>
              </ul>
            </li>
          
            <li className="sidebar-item">
              <Link to="/instructor/upload-certifcate" className="sidebar-link">
                <i className="fa-solid fa-house"></i>
                <span>Upload Certifcate</span>
              </Link>
            </li>
           
            <li className="sidebar-item">
              <div
                className="sidebar-link has-dropdown collapsed"
                data-bs-toggle="collapse"
                data-bs-target="#settings"
                aria-expanded="false"
                aria-controls="settings"
              >
                <i className="fa-solid fa-chart-simple"></i>
                <span>Settings</span>
              </div>
              <ul
                id="settings"
                className="sidebar-dropdown list-unstyled collapse mx-4"
                data-bs-parent="#sidebar"
              >
                <li className="sidebar-item">
                  <Link to="/instructor/change-password" className="sidebar-link">
                    <i className="fa-solid fa-chart-simple"></i>
                    <span>Change Password</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="sidebar-footer">
            <Link className="sidebar-link" onClick={logOutHandler}>
              <i className="fa-solid fa-right-to-bracket"></i>
              <span>Logout</span>
            </Link>
          </div>
        </aside>
     
    </>
  );
};

export default InstructorSidebar;
