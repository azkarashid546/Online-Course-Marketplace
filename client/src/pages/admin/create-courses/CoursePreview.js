import React, { useState } from "react";
import CoursePlayer from "../../../utils/CoursePlayer";
import Ratings from "../../../utils/Ratings";
const CoursePreview = ({
  courseData,
  handleCourseCreate,
  active,
  setActive,
  isEdit
}) => {
  const discountPercentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const [isFocused, setIsFocused] = useState(true);
  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate()
  }
  return (
    <>
      <div style={{ width: "90%", margin: "auto" }} className="py-5 mb-5">
        <div className="position-relative">
          <div className="mt-5">
            <CoursePlayer
              vedioUrl={courseData?.demoUrl}
              title={courseData?.title}
            />
          </div>
          <div className="d-flex align-items-center text-white">
            <h1 className="pt-5" style={{ fontSize: "25px" }}>
              {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
            </h1>
            <h5
              className="pl-2 mt-2"
              style={{
                fontSize: "20px",
                textDecoration: "line-through",
                opacity: "0.5",
              }}
            >
              {courseData.estimatedPrice}$
            </h5>
            <h4 className="pl-2 pt-4" style={{ fontSize: "22px" }}>
              {discountPercentagePrice}% Off
            </h4>
          </div>
          <div className="d-flex align-items-center">
            <div
              className="cursor-not-allowed my-3 p-2 text-white text-center"
              style={{
                width: "180px",
                backgroundColor: "crimson",
                borderRadius: "30px",
                fontSize: "20px",
              }}
            >
              Buy Now {courseData?.price}$
            </div>
          </div>
          <div className="d-flex align-items-center">
            <input
              type="text"
              className="form-control ml-3"
              name=""
              id=""
              placeholder="Dicount Code..."
              style={{
                outline: "none",
                backgroundColor: isFocused ? "transparent" : "",
                color: "white",
                width: "60%",
              }}
            />
            <div
              className="my-3 ml-4 cursor-pointer btn btn-primary"
              style={{ width: "120px", borderRadius: "30px" }}
            >
              Apply
            </div>
          </div>
          <ul className="pb-3 text-white">
            <li className="pb-1">Source Code included</li>
            <li className="pb-1">Full lifetime access</li>
            <li className="pb-1">Certifcate of completion</li>
            <li className="pb-1">Premimum Support</li>
          </ul>
          <div className="w-100 text-white">
            <div className="w-100">
              <h1
                className="text-white"
                style={{ fontSize: "25px", fontWeight: "600" }}
              >
                {courseData?.name}
              </h1>
              
              <div className="d-flex align-items-center justify-content-between pt-3">
                <div className="d-flex align-items-center">
                  <Ratings ratings={0} />
                  <h5>0 Reviews</h5>
                </div>
                <h5>0 Students</h5>
              </div>
              <br />
              <h1 style={{ fontSize: "25px", fontWeight: "600" }}>
                What you will learn from this course?
              </h1>
            </div>
            {courseData?.benefits?.map((item, index) => (
              <div
                className="d-flex w-100 py-2 md:align-items-center"
                key={index}
              >
                <div className="mr-1" style={{ width: "15px" }}>
                  <i class="fa-solid fa-check" size={20}></i>
                </div>
                <p className="pl-2">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <h1 style={{ fontSize: "25px", fontWeight: "600" }}>
              What are the prerequisties for starting this course?
            </h1>
            {courseData?.prerequisities?.map((item, index) => (
              <div
                className="d-flex w-100 py-2 md:align-items-center"
                key={index}
              >
                <div className="mr-1" style={{ width: "15px" }}>
                  <i class="fa-solid fa-check" size={20}></i>
                </div>
                <p className="pl-2">{item.title}</p>
              </div>
            ))}
            <div className="w-ful">
              <h1 style={{ fontSize: "25px", fontWeight: "600" }}>
                Course Details
              </h1>
              <p
                className="w-100 overflow-hidden whitespace-pre-line"
                style={{ fontSize: "18px", marginTop: "20px" }}
              >
                {courseData.description}
              </p>
            </div>
            <br />
            <br />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div
              className="rounded mt-8 cursor text-white btn btn-primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "40px",
                width: "60px",
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
                width: "60px",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => createCourse()}
            >
              {
                isEdit ? 'Update' : 'Create'
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursePreview;
