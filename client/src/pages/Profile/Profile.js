import React from "react";
import { Outlet } from "react-router-dom";
import ProfileSidebar from "./ProfileSidebar";
import ProfileInfo from "./ProfileInfo";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);
  return (
    <>
      {user.role === "user" ? (
        <div className="wrapper">
          <ProfileSidebar />
          <div
            className="main px-3 py-2"
            style={{
              backgroundImage: "linear-gradient(to right, #434d56, #242424)",
            }}
          >
            <Outlet />
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Profile;
