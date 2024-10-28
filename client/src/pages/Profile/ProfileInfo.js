import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "../../images/default-avatar.png";
import { useEditProfileMutation, useUpdateAvatarMutation } from "../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import { toast, Toaster } from "react-hot-toast";

const ProfileInfo = () => {
  const user = useSelector((state) => state.auth.user);
  const [avatar, setAvatar] = useState(null);
  const [editProfile, {isSuccess : success, error : updateError}] = useEditProfileMutation()
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });
  const [name, setName] = useState(user && user.name);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();

  const imageHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result;
        updateAvatar(avatar );
      }
    };
    fileReader.readAsDataURL(file);
  };

  useEffect(() => {
    if (isSuccess || success) {
      setLoadUser(true);
    }
    if (error || updateError) {
      console.log(error.data.message)
    }
    if(success){
      toast.success("Profile updated successfully!")
    }
  }, [isSuccess, error, success, updateError]);

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(name !== ""){
      await editProfile({
        name : name,
        email : user.email,
      })
    }
  };

  return (
    <>
      <div className="profile-info">
        <div className="profile-info-form">
         
        <div className="image-uploader">
  <div className="profile-user-img">
    <img src={(user && user.avatar) || avatar ? ((user && user.avatar.url) || avatar) : Avatar} alt="User Avatar" />
    <label htmlFor="avatar" className="avatar">
      <div className="camera-icon">
        <i className="fa-solid fa-camera fa-2xl"></i>
      </div>
      <input
        type="file"
        className="d-none"
        id="avatar"
        name=""
        onChange={imageHandler}
      />
    </label>
  </div>
</div>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">
                Name
              </label>
              <div className="d-flex password-input">
                <input
                  type="text"
                  className="form-control bg-transparent "
                  id="name"
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  style={{ outline: "none" }}
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">
                Email address
              </label>
              <input
                type="text"
                readOnly
                className="form-control w-100 bg-transparent text-white"
                id="email"
                name="email"
                value={user?.email}
                style={{ outline: "none", width: "100%" }}
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
    </>
  );
};

export default ProfileInfo;

