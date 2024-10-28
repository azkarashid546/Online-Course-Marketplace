import React, { useEffect, useState } from "react";
import Protected from "../../hooks/useProtected";
import { useSelector } from "react-redux";
import Avatar from "../../images/default-avatar.png";
import { Link } from "react-router-dom";
import { useLogOutQuery } from "../../redux/features/auth/authApi";
import { signOut } from "next-auth/react";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const ProfileSidebar = () => {
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  console.log(user.name);
  const [logout, setLogout] = useState(false);
  const { isSuccess, error } = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const logOutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Logout Successfully!");
    }
    if (error) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess, error]);

  return (
    <>
      {/* <div className="profile-sidebar text-light">
        <div className="sidebar-lists">
          <div className="profile-list">
            <div className="user-image">
              <img src={user.avatar.url ? user.avatar.url : Avatar} />
            </div>
            <Link to="/profile">
              <h5>My Account</h5>
            </Link>
          </div>
          <div className="profile-features">
            <div className="single-features">
              <i class="fa-solid fa-lock fa-lg"></i>
              <Link to="/profile/change-password">Change Password</Link>
            </div>
            <div className="single-features">
              <i class="fa-brands fa-discourse fa-lg"></i>
              <Link to="/profile/enrolled-courses">Enrolled Courses</Link>
            </div>
            {user.role === "admin" && (
              <div className="single-features">
                <i class="fa-solid fa-user-tie fa-lg"></i>
                <Link to="/admin">Admin Dashboard</Link>
              </div>
            )}

            <div className="single-features">
              <i class="fa-solid fa-right-from-bracket fa-lg"></i>
              <Link onClick={logOutHandler}>Logout</Link>
            </div>
          </div>
        </div>
      </div> */}
      
     <aside id="sidebar" className={isExpanded ? "expand" : ""}>
    <div className="d-flex">
        <button className="toggle-btn" onClick={handleToggle}>
            <i className="lni lni-grid-alt"></i>
        </button>
        <div className="sidebar-logo">
            <Link to="/profile">My Account</Link>
        </div>
    </div>

    <li className="sidebar-item-image">
        <div className="admin-image">
            <img
                src={user.avatar ? user.avatar.url : Avatar}
                alt="User Avatar"
            />
        </div>
        <div className="user-name mt-4">
            <h4 className="text-white">{user.name}</h4>
        </div>
    </li>

    <ul className="sidebar-nav">
        <li className="sidebar-item">
            <Link to="/profile/change-password" className="sidebar-link">
                <i class="fa-solid fa-lock fa-lg"></i>
              <span >Change Password</span>
            </Link>
        </li>
        <li className="sidebar-item">
            <Link to="/profile/enrolled-courses" className="sidebar-link">
            <i class="fa-brands fa-discourse fa-lg"></i>
              <span>Enrolled Courses</span>
            </Link>
        </li>
        <li className="sidebar-item">
            <Link to="/profile/view-certifcates" className="sidebar-link">
            <i class="fa-brands fa-discourse fa-lg"></i>
              <span>View Certifcates</span>
            </Link>
        </li>
         <li className="sidebar-item">
               <Link onClick={logOutHandler} className="sidebar-link">
               <i class="fa-solid fa-right-from-bracket fa-lg"></i>
                 <span>Logout</span>
               </Link>
           </li>
    </ul>
   
</aside>


    </>
  );
};

export default ProfileSidebar;
