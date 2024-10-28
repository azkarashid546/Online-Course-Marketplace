import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const CourseContent = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isFocused, setIsFocused] = useState(true);
  const [activeSection, setActiveSection] = useState(courseContentData.length);
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);

    const updatedData = courseContentData.map((item, i) => 
      i === index ? { ...item, isCollapsed: !item.isCollapsed } : item
    );
    setCourseContentData(updatedData);
  };

  const handleRemoveLink = (index, linksIndex) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index
        ? { ...item, links: item.links.filter((_, linkIdx) => linkIdx !== linksIndex) }
        : item
    );
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = courseContentData.map((item, i) =>
      i === index
        ? { ...item, links: [...item.links, { title: "", url: "" }] }
        : item
    );
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item) => {
    if (
      !item.title ||
      !item.description ||
      !item.vedioUrl ||
      !item.vedioLength ||
      !item.links ||
      !item.links[0].title ||
      !item.links[0].url
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      let newVedioSection = "";
      if (courseContentData.length > 0) {
        const lastVedioSection =
          courseContentData[courseContentData.length - 1].vedioSection;

        if (lastVedioSection) {
          newVedioSection = lastVedioSection;
        }
      }

      const newContent = {
        vedioUrl: "",
        title: "",
        description: "",
        vedioLength : "",
        vedioSection: newVedioSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };

  const prevButton = () => {
    setActive(active - 1);
  };

  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].vedioUrl === "" ||
      courseContentData[courseContentData.length - 1].vedioLength === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can not be empty!");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };

  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].vedioUrl === "" ||
      courseContentData[courseContentData.length - 1].vedioLength === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newSection = {
        vedioUrl: "",
        title: "",
        description: "",
        vedioLength : "",
        vedioSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newSection]);
    }
  };

  return (
    <div style={{ width: "80%", margin: "auto", marginTop: "24px" }}>
      <Toaster />
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.vedioSection !== courseContentData[index - 1].vedioSection;
          return (
            <div key={index}>
              <div className={` p-4 ${showSectionInput ? "mt-4" : "mt-0"}`} style={{ backgroundColor: "#5C5C5C" }}>
                {showSectionInput && (
                  <>
                    <div className="d-flex w-100 align-items-center">
                      <input
                        type="text"
                        style={{
                          border: "none",
                          outline: "none",
                          fontSize: "20px",
                          width: item.vedioSection === "Untitled Section" ? "170px" : "auto",
                        }}
                        className="cursor-pointer text-white bg-transparent"
                        value={item.vedioSection}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((section, idx) =>
                            idx === index ? { ...section, vedioSection: e.target.value } : section
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                      <i className="fa-solid fa-pencil cursor-pointer text-white"></i>
                    </div>
                  </>
                )}
                <div className="d-flex align-items-center justify-content-between">
                  {isCollapsed[index] ? (
                    <p className="text-white">{index + 1}. {item.title}</p>
                  ) : (
                    <div></div>
                  )}
                  <div className="d-flex align-items-center">
                    <i
                      className={`fa-solid fa-delete-left text-white mr-2 ${index > 0 ? "cursor-pointer" : "cursor-not-allowed"}`}
                      style={{ fontSize: "20px" }}
                      onClick={() => {
                        if (index > 0) {
                          const updatedData = courseContentData.filter((_, idx) => idx !== index);
                          setCourseContentData(updatedData);
                        }
                      }}
                    ></i>
                    <i
                      className="fa-solid fa-arrow-down text-white"
                      style={{
                        fontSize: "large",
                        transform: isCollapsed[index] ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapseToggle(index)}
                    ></i>
                  </div>
                </div>
                {isCollapsed[index] && <hr className="my-3" />}
                {!isCollapsed[index] && (
                  <>
                    <hr className="my-3" />
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label text-white">Video Title</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className="form-control"
                        value={item.title}
                        style={{
                          outline: "none",
                          backgroundColor: isFocused ? "transparent" : "",
                          color: "white",
                        }}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((content, idx) =>
                            idx === index ? { ...content, title: e.target.value } : content
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vedioUrl" className="form-label text-white">Video Url</label>
                      <input
                        type="text"
                        placeholder="Project Plan..."
                        className="form-control"
                        value={item.vedioUrl}
                        style={{
                          outline: "none",
                          backgroundColor: isFocused ? "transparent" : "",
                          color: "white",
                        }}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((content, idx) =>
                            idx === index ? { ...content, vedioUrl: e.target.value } : content
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="vedioLength" className="form-label text-white">Video Length (in minutes)</label>
                      <input
                        type="number"
                        placeholder="20"
                        className="form-control"
                        value={item.vedioLength}
                        style={{
                          outline: "none",
                          backgroundColor: isFocused ? "transparent" : "",
                          color: "white",
                        }}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((content, idx) =>
                            idx === index ? { ...content, vedioLength: e.target.value } : content
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label text-white">Video Description</label>
                      <textarea
                        rows="8"
                        cols="30"
                        name="description"
                        placeholder="Project Plan..."
                        className="form-control p-2"
                        value={item.description}
                        style={{
                          outline: "none",
                          backgroundColor: isFocused ? "transparent" : "",
                          color: "white",
                        }}
                        onChange={(e) => {
                          const updatedData = courseContentData.map((content, idx) =>
                            idx === index ? { ...content, description: e.target.value } : content
                          );
                          setCourseContentData(updatedData);
                        }}
                      />
                      <br />
                      <br />
                      <br />
                    </div>
                    {item?.links.map((link, linksIndex) => (
                      <div className="mb-3 d-block" key={linksIndex}>
                        <div className="w-100 d-flex align-items-center justify-content-between">
                          <label htmlFor="" className="form-label text-white">Link {linksIndex + 1}</label>
                          <i
                            className={`fa-solid fa-delete-left text-white mr-2 ${linksIndex > 0 ? "cursor-pointer" : "cursor-not-allowed"}`}
                            style={{ fontSize: "20px" }}
                            onClick={() => {
                              if (linksIndex > 0) {
                                handleRemoveLink(index, linksIndex);
                              }
                            }}
                          ></i>
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code...{Link Title}"
                          className="form-control mb-3"
                          value={link.title}
                          style={{
                            outline: "none",
                            backgroundColor: isFocused ? "transparent" : "",
                            color: "white",
                          }}
                          onChange={(e) => {
                            const updatedData = courseContentData.map((content, idx) =>
                              idx === index
                                ? {
                                    ...content,
                                    links: content.links.map((l, linkIdx) =>
                                      linkIdx === linksIndex ? { ...l, title: e.target.value } : l
                                    ),
                                  }
                                : content
                            );
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="Source Code Url...{Link URL}"
                          className="form-control mb-3"
                          value={link.url}
                          style={{
                            outline: "none",
                            backgroundColor: isFocused ? "transparent" : "",
                            color: "white",
                          }}
                          onChange={(e) => {
                            const updatedData = courseContentData.map((content, idx) =>
                              idx === index
                                ? {
                                    ...content,
                                    links: content.links.map((l, linkIdx) =>
                                      linkIdx === linksIndex ? { ...l, url: e.target.value } : l
                                    ),
                                  }
                                : content
                            );
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    <div className="inline-block mb-4">
                      <p
                        style={{ fontSize: "20px" }}
                        className="d-flex align-items-center justify-content-start text-white cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <i className="fa-solid fa-link mx-2"></i> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      style={{ fontSize: "18px" }}
                      className="d-flex align-items-center text-white"
                      onClick={() => newContentHandler(item)}
                    >
                      <i className="fa-solid fa-plus mx-2"></i> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
        <br />
        <div
          className="d-flex align-items-center text-white cursor-pointer mb-5"
          style={{ fontSize: "20px" }}
          onClick={() => addNewSection()}
        >
          <i className="fa-solid fa-plus mx-2"></i> Add New Section
        </div>
      </form>
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
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
