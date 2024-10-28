import React, { useEffect, useState } from "react";
import { useGetUsersAllCoursesQuery } from "../../redux/features/courses/coursesApi";
import CourseCard from "./CourseCard";

const Courses = () => {
  const { data, isLoading } = useGetUsersAllCoursesQuery();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(data?.courses || []);
    console.log(data?.courses);
  }, [data]);

  return (
    <>
      <div className="courses">
        <h1
          className="text-center text-white"
          style={{ fontSize: "25px", marginTop: "150px", marginBottom: "70px" }}
        >
          Expand Your Career
          <span className="text-primary"> Opportunity </span> <br />
          Opportunity With Our Courses
        </h1>
        <div className="row">
          {courses &&
            courses.map((item, index) => (
              <div className="col-12 col-md-6 col-lg-3 mb-4" key={index}>
                <CourseCard item={item} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Courses;
