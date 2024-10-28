import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetUsersAllCoursesQuery } from "../../redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";
import Loader from "../../components/Loader/Loader";
import CourseCard from "../../components/Home/CourseCard";

const Courses = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get("title");
  const { data, isLoading } = useGetUsersAllCoursesQuery(undefined, {});
  const { data: categoriesData } = useGetHeroDataQuery("Categories", {});
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
 console.log("categoriesData",categoriesData)
  useEffect(() =>
     {
    if (data) {
      if (category === "All") {
        setCourses(data.courses);
      } else {
        setCourses(data.courses.filter((item) => item.categories === category));
      }
      if (search) {
        setCourses(
          data.courses.filter((item) =>
            item.name.toLowerCase().includes(search.toLowerCase())
          )
        );
      }
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout?.categories;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
        <div className="container">
        <div className="w-100 d-flex align-items-center flex-wrap">
            <div
              style={{
                height: "35px",
                backgroundColor: category === "All" ? "#FF017E" : "#5050cb",
                borderRadius: "30px",
              }}
              className="d-flex align-items-center justify-content-center cursir-pointer m-3 px-3"
              onClick={() => setCategory("All")}
            >
              All
            </div>
            {categories &&
              categories.map((item, index) => (
                <div key={index}>
                  <div
                    style={{
                      height: "35px",
                      backgroundColor: category === item.title ? "#FF017E" : "#5050cb",
                      borderRadius: "30px",
                    }}
                    className="d-flex align-items-center justify-content-center cursir-pointer m-3 px-3"
                    onClick={() => setCategory(item.title)}
                  >
                    {item.title}
                  </div>
                </div>
              ))}
          </div>
          {
            courses && courses.length === 0 && (
                <p className="text-white d-flex align-items-center justify-content-center" style={{minHeight : "50vh"}}>
                  {search ? "No courses found!" : "No courses found in this category. Please try another one!"}
                </p>
            )
          }
          <br />
          <br />
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
      )}
    </>
  );
};

export default Courses;
