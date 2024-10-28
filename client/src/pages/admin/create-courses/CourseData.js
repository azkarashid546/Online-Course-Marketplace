import React, { useState } from "react";
import {toast, Toaster} from "react-hot-toast";

const CourseData = ({
  benefits,
  setBenefits,
  prerequisities,
  setPrerequisities,
  active,
  setActive,
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const handleBenefitsChange = (index, value) => {
    setBenefits(benefits.map((benefits, i) => i === index ? { ...benefits, title: value } : benefits));
  };
  
  const handlePrerequistiesChange = (index, value) => {
    setPrerequisities(prerequisities.map((prerequisities, i) => i === index ? { ...prerequisities, title: value } : prerequisities));
  };

 
  const handleAddBenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };


  const handleAddPrerequisties = () => {
    setPrerequisities([...prerequisities, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1 )
  }
 

  const handleOptions = () => {
    if(benefits[benefits.length - 1]?.title !== ""  && prerequisities[prerequisities.length -1 ]?.title !== ""){
        setActive(active+1)
    }
    else{
        toast.error("Please fill the fields for go to next!")
    }
  }

  return (
    <>
      <div style={{ width: "80%", margin: "auto", marginTop: "24px" }}>
        <div className="mb-3">
            <Toaster/>
          <label htmlFor="name" className="form-label text-white">
            What are the benefits for students in this course?
          </label>
          {benefits.map((benefit, index) => (
            <input
              type="text"
              key={index}
              name="benefits"
              className="form-control"
              placeholder="You will be able to build a full stack LMS Platform..."
              style={{
                outline: "none",
                backgroundColor: isFocused ? "transparent" : "",
                color: "white",
                margin: "15px 0px",
              }}
              value={benefit.title}
              onChange={(e) => handleBenefitsChange(index, e.target.value)}
            />
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <i
              className="fa-solid fa-plus"
              style={{
                margin: "10px 0px",
                cursor: "pointer",
                width: "30px",
                color: "white",
              }}
              onClick={handleAddBenefits}
            ></i>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="prerequisities" className="form-label text-white">
            What are the prerequisities for students in this course?
          </label>
          {prerequisities.map((prerequisities, index) => (
            <input
              type="text"
              key={index}
              name="prerequisities"
              className="form-control"
              placeholder="You need basic knowledge of MERN stack"
              style={{
                outline: "none",
                backgroundColor: isFocused ? "transparent" : "",
                color: "white",
                margin: "15px 0px",
              }}
              value={prerequisities.title}
              onChange={(e) => handlePrerequistiesChange(index, e.target.value)}
            />
          ))}

          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
            }}
          >
            <i
              className="fa-solid fa-plus"
              style={{
                margin: "10px 0px",
                cursor: "pointer",
                width: "30px",
                color: "white",
              }}
              onClick={handleAddPrerequisties}
            ></i>
          </div>
        </div>
        <div class="d-flex align-items-center justify-content-between">
          <div
            className="rounded mt-8 cursor text-white btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              width : "60px",
             
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={() => prevButton()}
          >
            Prev
          </div>
          <div
            className="rounded mt-8 cursor text-white btn btn-primary"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "40px",
              width : "60px",
             
              textAlign: "center",
              cursor: "pointer", 
            }}
            onClick={() => handleOptions()}
          >
            Next
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseData;
