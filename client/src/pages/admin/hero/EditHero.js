import React, { useEffect, useState } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../redux/features/layout/layoutApi";
import toast, { Toaster } from "react-hot-toast";
const EditHero = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data, refetch } = useGetHeroDataQuery("Banner", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isLoading, isSuccess, error }] = useEditLayoutMutation();
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("Hero updated successfully!");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (data) {
      setTitle(data?.layout?.banner?.title);
      setSubTitle(data?.layout?.banner?.subTitle);
      setImage(data?.layout?.banner?.image?.url);
    }
   
  }, [data, isSuccess, error]);
  const handleUpdate = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.readyState === 2) {
          setImage(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async () => {
    await editLayout({
      type: "Banner",
      image,
      title,
      subTitle,
    });
  };
  return (
    <>
     
  <Toaster />
  <div className="row">
    {/* Left column */}
    <div className="col-md-6">
      <div className="hero-img-section position-relative">
        <div
          className="hero-img"
          style={{
            position: "relative",
          }}
        >
          <img src={image} alt="" className="position-relative" />
        </div>
        <label
          htmlFor="banner"
          className="mb-2"
          style={{
            zIndex: 20,
            cursor: "pointer",
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <input
            type="file"
            name="image"
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className="d-none"
          />
          <i className="fas fa-camera fa-2xl text-white"></i>
        </label>
      </div>
    </div>
    <div className="col-md-6">
      <div className="hero-content py-5">
        <div className="heading">
          <textarea
            name="title"
            id=""
            className="text-white resize-none px-3 w-100 bg-transparent"
            placeholder="Improve Your Online Learning Experience Instantly"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            rows={3}
            style={{
              fontSize: "46px",
              lineHeight: "55px",
              fontWeight: "bold",
              border: "none",
              resize: "none",
              outline: "none",
            }}
          ></textarea>
          <br />
          <br />
          <textarea
            name="subTitle"
            id=""
            className="text-white resize-none px-3 w-100 bg-transparent"
            placeholder="We have 40K+ Online Courses & 500K+ registered students. Find you..."
            value={subTitle}
            onChange={(e) => setSubTitle(e.target.value)}
            rows={2}
            style={{
              fontSize: "23px",
              border: "none",
              resize: "none",
              outline: "none",
            }}
          ></textarea>
          <br />
          <br />
          <br />
          <br />
           <div className="d-flex align-items-end justify-content-end">
           <div
            className={`btn btn-primary ${
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? "cursor-pointer"
                : "disabled"
            }`}
            onClick={
              data?.layout?.banner?.title !== title ||
              data?.layout?.banner?.subTitle !== subTitle ||
              data?.layout?.banner?.image?.url !== image
                ? handleEdit
                : () => null
            }
          >
            Save
          </div>
           </div>
          
        </div>
      </div>
    </div>

    {/* Right column */}
   
  </div>


    </>
  );
};

export default EditHero;
