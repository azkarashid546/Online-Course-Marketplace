import React from "react";
import { Link } from "react-router-dom";
import Ratings from "../../utils/Ratings";

const CourseCard = ({ item, isProfile }) => {
  console.log("item", item);
  return (
    <Link to={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}>
      <div
        className="card text-white h-100"
        style={{ backgroundColor: "#5B5B5B" }}
      >
        <img
          src={item.thumbnail.url}
          className="card-img-top"
          alt="Course Thumbnail"
        />
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">{item.name}</h5>
          <div className="d-flex align-items-center justify-content-between mb-3 mt-2">
            <Ratings rating={item.ratings} />
            {!isProfile && <h5 className="mb-0 " style={{fontSize : "17px"}}>{item.purchased} Students</h5>}
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex gap-1">
              <h3 className="mb-0" style={{ fontSize: "17px" }}>
                {item.price === 0 ? "Free" : `${item.price}$`}
              </h3>
              <h5
                className="pl-3 mb-0 text-white"
                style={{
                  fontSize: "14px",
                  textDecoration: "line-through",
                  opacity: "0.6",
                }}
              >
                {item.estimatedPrice}$
              </h5>
            </div>

            <div className="d-flex gap-2 align-items-center">
              <i class="fa-solid fa-list fa-md text-white"></i>
              <h5 className="pl-2 text-white mb-0" style={{ fontSize: "17px" }}>
                {item.courseData.length} Lectures
              </h5>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
