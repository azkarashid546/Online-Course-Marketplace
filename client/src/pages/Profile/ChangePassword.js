import React, { useState, useEffect } from "react";
import { useUpdatePasswordMutation } from "../../redux/features/user/userApi";
import {toast, Toaster} from "react-hot-toast";
import { useParams } from "react-router-dom";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [updatePassword, {isSuccess, error}] = useUpdatePasswordMutation()
  const passwordChangeHandler = async(e) => {
    e.preventDefault();
    if(newPassword !== confirmPassword){
      toast.error("Passwords do not match!")
    }
    else{
      await updatePassword({oldPassword, newPassword})
    }
  };

  useEffect(() => {
    if(isSuccess){
      toast.success("Password changed successfully!")
    }
    if(error){
      console.log(error)
      toast.error(error.data.message)
    }
  }, [isSuccess, error])
  return (
    <>
      <div className="profile-info" style={{marginTop : "60px"}}>
        <div className="profile-info-form">
          <Toaster/>
          <h1 className="text-light text-center">Change Password</h1>
          <div className="w-full">
            <form onSubmit={passwordChangeHandler}>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label text-white">
                  Enter your old password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="oldPassword"
                  name="oldPassword"
                  onChange={(e) => setOldPassword(e.target.value)}
                  value={oldPassword}
                  style={{ outline: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label text-white">
                  Enter a new password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="newPassword"
                  name="newPassword"
                  onChange={(e) => setNewPassword(e.target.value)}
                  value={newPassword}
                  style={{ outline: "none" }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword" className="form-label text-white">
                  Enter your confirm password
                </label>

                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  style={{ outline: "none" }}
                />
              </div>
              <button
              type="submit"
              className="btn btn-primary w-100"
              style={{ borderRadius: "50px" }}
            >
              Update
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
