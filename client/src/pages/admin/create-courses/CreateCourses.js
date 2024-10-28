import React, { useEffect, useState } from "react";
import CourseInformation from "./CourseInformation";
import CourseOptions from "./CourseOptions";
import CourseData from "./CourseData";
import CourseContent from "./CourseContent";
import CoursePreview from "./CoursePreview";
import { useNavigate } from "react-router-dom";
import { useCreateCoursesMutation } from "../../../redux/features/courses/coursesApi";
import toast, { Toaster } from "react-hot-toast";

const CreateCourses = () => {
  const navigate = useNavigate();
  const [createCourses, { isLoading, isSuccess, error }] = useCreateCoursesMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course created successfully");
      navigate("/admin/all-courses");
    }
    if (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [isSuccess, error, navigate]);

  const [courseInfo, setCourseInfo] = useState({
    name: "",
    categories: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });

  const [active, setActive] = useState(0);
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisities, setPrerequisities] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      vedioUrl: "",
      title: "",
      description: "",
      vedioSection: "Untitled Section",
      vedioLength: "",
      links: [{ title: "", url: "" }],
      suggestions: "",
    },
  ]);
  

  const [courseData, setCourseData] = useState({});
  console.log(courseData);

  const handleNext = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleSubmit = async () => {
    const formattedBenefits = benefits.map((benefit) => ({ title: benefit.title }));
    const formattedPrerequisities = prerequisities.map((prerequisite) => ({ title: prerequisite.title }));
    const formattedCourseContentData = courseContentData.map((content) => ({
      vedioUrl: content.vedioUrl,
      title: content.title,
      description: content.description,
      vedioLength: content.vedioLength,
      vedioSection: content.vedioSection,
      links: content.links.map((link) => ({ title: link.title, url: link.url })),
      suggestions: content.suggestions,
    }));
  
    const data = {
      ...courseInfo,
      benefits: formattedBenefits,
      prerequisities: formattedPrerequisities,
      courseData: formattedCourseContentData, // Note: change key to match backend schema
    };
    setCourseData(data);
  };
  

  const handleCourseCreate = async () => {
    if (!isLoading) {
      await createCourses(courseData);
    }
  };

  return (
    <div className="d-flex w-100 min-vh-100 create-course">
      <div style={{ width: "80%" }} className="width">
        <Toaster />
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
            handleNext={handleNext}
          />
        )}
        {active === 1 && (
          <CourseData
            benefits={benefits}
            setBenefits={setBenefits}
            prerequisities={prerequisities}
            setPrerequisities={setPrerequisities}
            active={active}
            setActive={setActive}
            handleNext={handleNext}
          />
        )}
        {active === 2 && (
          <CourseContent
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            active={active}
            setActive={setActive}
            handleNext={handleNext}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && (
          <CoursePreview
            courseData={courseData}
            setCourseData={setCourseData}
            active={active}
            setActive={setActive}
            handleCourseCreate={handleCourseCreate}
          />
        )}
      </div>
      <div
        className="course-options  min-vh-100"
        style={{
          width: "20%",
          marginTop: "70px",
          position: "fixed",
          top: "18px",
          right: "0",
        }}
      >
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default CreateCourses;
