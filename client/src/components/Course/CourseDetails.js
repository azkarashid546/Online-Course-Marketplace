import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Ratings from "../../utils/Ratings";
import { format } from "timeago.js";
import CoursePlayer from "../../utils/CoursePlayer";
import { Link } from "react-router-dom";
import CourseContentList from "./CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../../pages/payment/CheckOutForm";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import Avatar from "../../images/default-avatar.png";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";
import { useGetAllCoursesByUserQuery, useGetAllCoursesInstructorQuery, useGetAllCoursesQuery, useGetUsersAllCoursesQuery } from "../../redux/features/courses/coursesApi";
const CourseDetails = ({
  users,
  data,
  clientSecret,
  stripePromise,
  setOpen: openAuthModal,
}) => {
  console.log("data data",users)


  const {data : instructorCourses} = useGetUsersAllCoursesQuery()
  console.log(instructorCourses)
  let navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  

  const [userData, setUserData] = useState();
 
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);
  console.log(userData?.avatar.url)
  const discountPercentage =
    (Math.abs(data?.course?.estimatedPrice - data?.course?.price) /
      data?.course?.estimatedPrice) *
    100;

  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    userData && userData?.courses?.find((item) => item._id === data?.course?._id);
  console.log(isPurchased);

  const handleOrder = (e) => {
    if (user) {
      setOpen(true);
    } else {
      navigate("/login");
      openAuthModal(true);
    }
  };
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <h1 className="text-white" style={{ fontSize: "25px" }}>
              {data?.course?.name}
            </h1>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-centexr gap-3">
                <Ratings rating={data?.course?.ratings} />
                <h5 className="text-white mb-0">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>
              <div className="text-md-right">
                <h5 className="text-white mb-0">
                  {data?.course?.purchased} Students
                </h5>
              </div>
            </div>

            <h1
              className="text-white mt-5"
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              What you will learn from this course?
            </h1>
            <div>
              {data?.course?.benefits.map((item, index) => (
                <div className="d-flex  py-2 gap-2" key={index}>
                  <div className="mr-1">
                    <i className="fa-solid fa-check fa-md text-white"></i>
                  </div>
                  <p className="text-white">{item.title}</p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <h1
              className="text-white"
              style={{ fontSize: "25px", fontWeight: "600" }}
            >
              What you will prerequisities for starting this course?
            </h1>
            <div>
              {data?.course?.prerequisities.map((item, index) => (
                <div className="d-flex  py-2 gap-2" key={index}>
                  <div className="mr-1">
                    <i className="fa-solid fa-check fa-md text-white"></i>
                  </div>
                  <p className="text-white">{item.title}</p>
                </div>
              ))}
            </div>
            <br />
            <br />
            <div>
              <h1
                className="text-white"
                style={{ fontSize: "25px", fontWeight: "600" }}
              >
                Course Overview
              </h1>
              <CourseContentList
                data={data?.course?.courseData}
                isDemo={true}
              />
            </div>
            <br />
            <br />
            <div className="">
              <h1
                className="text-white"
                style={{ fontSize: "25px", fontWeight: "600" }}
              >
                Course Details
              </h1>
              <p
                className="text-white"
                style={{
                  fontSize: "18px",
                  marginTop: "20px",
                  overflow: "hidden",
                  whiteSpace: "pre-line",
                }}
              >
                {data?.course?.description}
              </p>
            </div>
            <div className="">
              <div className="d-flex align-items-center gap-2">
                <Ratings rating={data?.course?.ratings} />
                <h5 className="text-white mb-0" style={{ fontSize: "25px" }}>
                  {Number.isInteger(data?.course?.ratings)
                    ? data?.course?.ratings.toFixed(1)
                    : data?.course?.ratings.toFixed(2)}
                  Course Ratings • {data?.course?.review?.length} Reviews
                </h5>
              </div>
              <div className="row mt-5">
                {data?.course.review &&
                  Array.isArray(data?.course?.review) &&
                  [...data?.course.review].reverse().map((item, index) => (
                    <div className="w-100 pb-4" key={index}>
                      <div className="d-flex ">
                        <div
                          className="default-avatar"
                          style={{
                            width: "45px",
                            height: "45px",
                            marginRight: "10px",
                          }}
                        >
                          <img
                            src={
                              userData?.avatar ? userData?.avatar.url : Avatar
                            }
                            alt=""
                            style={{ height: "100%", borderRadius: "50%" }}
                          />
                        </div>
                        <div className="px-2">
                          <div className=" d-flex align-items-center">
                            <h5
                              className="text-white mb-0"
                              style={{ fontSize: "20px", paddingRight: "2px" }}
                            >
                              {userData?.name}
                            </h5>
                            <Ratings rating={item.rating} />
                          </div>

                          <p className="mb-0">{item.comment}</p>
                          <small style={{ color: "#ffffff83" }}>
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                      {item.commentReplies.map((reply) => (
                        <div
                          className="w-100 d-flex my-5 text-white"
                          style={{ marginLeft: "30px" }}
                        >
                          <div
                            className="default-avatar"
                            style={{
                              width: "45px",
                              height: "45px",
                              marginRight: "10px",
                            }}
                          >
                            <img
                              src={
                                reply.user?.avatar
                                  ? reply.user?.avatar.url
                                  : Avatar
                              }
                              alt=""
                              style={{
                                height: "100%",
                                borderRadius: "50%",
                              }}
                            />
                          </div>
                          <div className="px-2">
                            <div className="d-flex w-100 align-items-center gap-2">
                              <h5 className="mb-0" style={{ fontSize: "20px" }}>
                                {reply?.user?.name}
                              </h5>
                              {reply?.user?.role === "admin" && (
                                <VerifiedIcon
                                  style={{ color: "#0d6efd", fontSize: "20px" }}
                                />
                              )}
                              {reply?.user?.role === "instructor" && (
                                <VerifiedIcon
                                  style={{ color: "red", fontSize: "20px" }}
                                />
                              )}
                            </div>

                            <p className="mb-0">{reply.comment}</p>
                            <small style={{ color: "#ffffff83" }}>
                              {format(reply.createdAt)}
                            </small>
                          </div>
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div
              className=""
              style={{ position: "sticky", top: "40px", left: "0" }}
            >
              <div className=" w-100 left-0">
                <CoursePlayer
                  vedioUrl={data?.course.demoUrl}
                  title={data?.title}
                />
              </div>
              <div className="d-flex align-items-center">
                <h1 className="pt-5 text-white" style={{ fontSize: "25px" }}>
                  {data?.course.price === 0 ? "Free" : data?.course.price + "$"}
                </h1>
                <h5
                  className="pl-3 mt-2 text-white"
                  style={{
                    textDecoration: "line-through",
                    fontSize: "20px",
                    opacity: "0.5",
                  }}
                >
                  {data?.course?.estimatedPrice}$
                </h5>
                <h4
                  className="pl-3 pt-4 text-white mx-2"
                  style={{ fontSize: "22px" }}
                >
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="d-flex align-items-center">
                {
                  isPurchased ? (
                    <Link
                      to={`/course-access/${data?.course._id}`}
                      className="cursor-pointer btn btn-primary my-3 p-2"
                    >
                      Enter to Course
                    </Link>
                  ) : (
                  
                      <button
                      className={`my-3 cursor-pointer btn btn-primary p-2 `}
                      onClick={handleOrder}
                      style={{ borderRadius: "50px" }}
                    >
                      Buy Now {data?.course?.price}$
                    </button>
                      
                    
                    
                  )
               }
               {/* {
                user?.role === "admin" || user?.role === "instructor" ? (
                  <Link
                  to={`/course-access/${data?.course._id}`}
                  className="cursor-pointer btn btn-primary my-3 p-2"
                >
                  Enter to Course
                </Link>
                ) : (<></>)
               } */}
              </div>
              <br />
              <p className="pb-1 text-white">• Source code included</p>
              <p className="pb-1 text-white">• Full time access</p>
              <p className="pb-1 text-white">• Certifcate of completion</p>
              <p className="pb-1 text-white">• Premium support</p>
            </div>
          </div>
        </div>
        <>
          {open && user && (
            <div className="position-fixed w-100 h-100 top-0 start-0 z-3 d-flex align-items-center justify-content-center">
              <div
                className="rounded shadow p-3"
                style={{
                  width: "450px",
                  minHeight: "400px",
                  backgroundColor: "white",
                }}
              >
                <div className="w-100 d-flex justify-content-end">
                  <i
                    className="fa-solid fa-x fa-md text-dark cursor-pointer"
                    onClick={() => setOpen(false)}
                  ></i>
                </div>
                <div className="w-100">
                  {stripePromise && clientSecret && (
                    <Elements stripe={stripePromise} options={{ clientSecret }}>
                      <CheckOutForm setOpen={setOpen} data={data} user={user} />
                    </Elements>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </>
  );
};

export default CourseDetails;
