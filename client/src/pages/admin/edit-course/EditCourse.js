
import React, { useEffect, useState } from "react";
import CourseInformation from "../create-courses/CourseInformation";
import CourseOptions from "../create-courses/CourseOptions";
import CourseData from "../create-courses/CourseData";
import CourseContent from "../create-courses/CourseContent";
import CoursePreview from "../create-courses/CoursePreview";
import { useNavigate, useParams } from "react-router-dom";
import { useEditCourseMutation, useGetAllCoursesInstructorQuery, useGetAllCoursesQuery } from "../../../redux/features/courses/coursesApi";
import toast, { Toaster } from "react-hot-toast";
const EditCourse = () => {
  const navigate = useNavigate();
  
  const [editCourse, {isSuccess, error}] = useEditCourseMutation()

  const { id } = useParams();
    const {isLoading,  data, refetch } = useGetAllCoursesInstructorQuery({}, { refetchOnMountOrArgChange: true });

    const editCourseData = data && data.courses.find((i) => i._id === id)
     console.log(data)
    console.log("edit",editCourseData)

    useEffect(() => {
    if (editCourseData) {
      setCourseInfo({
        name: editCourseData?.name,
        description: editCourseData?.description,
        categories : editCourseData?.categories,
        price: editCourseData?.price,
        estimatedPrice: editCourseData?.estimatedPrice,
        tags: editCourseData?.tags,
        level: editCourseData?.level,
        demoUrl: editCourseData?.demoUrl,
        thumbnail: editCourseData?.thumbnail?.url
      });
      setBenefits(editCourseData?.benefits);
      setPrerequisities(editCourseData?.prerequisities);
      setCourseContentData(editCourseData?.courseData);
    }
  }, [editCourseData]);
  

  useEffect(() => {
    if (isSuccess) {
      toast.success("Course updated successfully");
      navigate("/admin/all-courses");
    }
    if (error) {
      console.log(error);
      toast.error(error?.data?.message);
    }
  }, [isLoading, isSuccess, error]);


  const [courseInfo, setCourseInfo] = useState({
    name: "",
    description: "",
    categories : "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
  });
  // const [active, setActive] = useState(0);
  const [benefits, setBenefits] = useState([{ title: "" }]);
  const [prerequisities, setPrerequisities] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      vedioUrl: "",
      title: "",
      description: "",
      vedioLength : "",
      vedioSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestions: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});
  console.log("courseData",courseData)
  const [active, setActive] = useState(0);
  const handleNext = (e) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleSubmit = async () => {
    const formittedBenefits = benefits.map((benefits) => ({
      title: benefits.title,
    }));

    const formittedPrerequisities = prerequisities.map((prerequisities) => ({
      title: prerequisities.title,
    }));

    const formittedCourseContentData = courseContentData.map(
      (courseContent) => ({
        vedioUrl: courseContent.vedioUrl,
        vedioLength : courseContent.vedioLength,
        title: courseContent.title,
        description: courseContent.description,
        vedioSection: courseContent.vedioSection,
        links: courseContent.links.map((links) => ({
          title: links.title,
          url: links.url,
        })),
        suggestions: courseContent.suggestions,
      })
    );
    console.log("data data",formittedCourseContentData)

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      categories : courseInfo.categories,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVedios: courseInfo.length,
      benefits: formittedBenefits,
      prerequisities: formittedPrerequisities,
      courseData: formittedCourseContentData,
    };
    console.log("data",data)
    setCourseData(data);
  };
 
  const handleCourseCreate = async (e) => {
    const data = courseData;
   await editCourse({id:editCourseData?._id, data})
    
  };
  return (
    <>
      <div class="d-flex w-100 min-vh-100">
        <div style={{ width: "80%" }}>
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
              prerequisities={prerequisities}
              setPrerequisities={setPrerequisities}
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
              isEdit={true}
            />
          )}
        </div>
        <div
          className="min-vh-100"
          style={{
            width: "20%",
            marginTop: "70px",
            position: "fixed",
            top: "18px",
            right: "0",
          }}
        >
          <CourseOptions active={active} setActive={setActive}/>
        </div>
      </div>
    </>
  );
};

export default EditCourse;

