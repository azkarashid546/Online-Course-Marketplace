import React, { useState } from "react";
import { Link } from "react-router-dom";
import Chatgpt from "../../pages/chatgpt/Chatgpt";

const CourseContentList = ({ data, isDemo, user }) => {
  const [visibleSection, setVisibleSection] = useState(new Set());
  const [activeVideo, setActiveVideo] = useState();
  const [showChatGPT, setShowChatGPT] = useState(false);
  const videoSections = [...new Set(data.map((item) => item.vedioSection))];
  let totalCount = 0;
  console.log("data", data);

  const toggleSection = (section) => {
    const newVisibleSections = new Set(visibleSection);
    if (newVisibleSections.has(section)) {
      newVisibleSections.delete(section);
    } else {
      newVisibleSections.add(section);
    }
    setVisibleSection(newVisibleSections);
  };

  const handlePencilClick = () => {
    setShowChatGPT(!showChatGPT); // Toggle the showChatGPT state when the pencil icon is clicked
  };

  return (
    <>
      <div
        className={`w-100 ${!isDemo ? "position-sticky" : ""}`}
        style={{
          marginTop: "15px",
          top: !isDemo ? "24px" : "auto",
          zIndex: !isDemo ? 30 : "auto",
          marginLeft: !isDemo ? "-30px" : "0",
        }}
      >
        {videoSections.map((section, sectionIndex) => {
          const isSectionVisible = visibleSection.has(section);

          const sectionVideos = data.filter(
            (item) => item.vedioSection === section
          );
          const sectionVideoCount = sectionVideos.length;
          const sectionVideoLength = sectionVideos.reduce(
            (totalLength, item) => totalLength + item.vedioLength,
            0
          );
          const sectionStartIndex = totalCount;
          totalCount += sectionVideoCount;
          const sectionContentHours = sectionVideoLength / 60;

          return (
            <>
              <div
                className={`${!isDemo ? "border-bottom" : ""}`}
                style={{
                  borderBottomColor: !isDemo ? "#ffffff8e" : "inherit",
                  paddingBottom: !isDemo ? "0.5rem" : "0",
                }}
                key={sectionIndex}
              >
                <div className="w-100 d-flex">
                  <div className="w-100 d-flex align-items-center justify-content-between">
                    <h2 className="text-white" style={{ fontSize: "22px" }}>
                      {section}
                    </h2>
                    <button
                      className="mx-4 cursor-pointer text-white bg-transparent"
                      style={{ border: "none" }}
                      onClick={() => toggleSection(section)}
                    >
                      {isSectionVisible ? (
                        <i className="fa-solid fa-angle-up fa-md text-white"></i>
                      ) : (
                        <i className="fa-solid fa-angle-down fa-md text-white"></i>
                      )}
                    </button>
                  </div>
                </div>
                <h5 className="text-white" style={{ fontSize: "18px" }}>
                  {sectionVideoCount} Lessons •{" "}
                  {sectionVideoLength < 60
                    ? sectionVideoLength
                    : sectionContentHours.toFixed(2)}
                  {sectionVideoLength < 60 ? " minutes" : " hours"}
                </h5>
                <br />
                {isSectionVisible && (
                  <div className="w-100">
                    {sectionVideos.map((item, index) => {
                      const videoIndex = sectionStartIndex + index;
                      const contentLength = item.vedioLength / 60;
                      return (
                        <div
                          className="w-100 cursor-pointer transition-all p-2"
                          style={{
                            backgroundColor:
                              videoIndex === activeVideo ? "gray" : "",
                          }}
                          key={item._id}
                          onClick={() =>
                            isDemo ? null : setActiveVideo(videoIndex)
                          }
                        >
                          <div className="d-flex align-items-center gap-4">
                            <i
                              className="lni lni-video"
                              style={{ fontSize: "33px", color: "#0B5ED7" }}
                            ></i>
                            <h1
                              className="d-inline-block text-wrap text-white mb-0"
                              style={{ fontSize: "21px" }}
                            >
                              {item.title}
                            </h1>
                          </div>
                          <h5
                            className="pl-8 text-white mt-2"
                            style={{ fontSize: "18px" }}
                          >
                            {contentLength.toFixed(2)}{" "}
                            {item.vedioLength > 60 ? "hours" : "minutes"}
                          </h5>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
              <div style={{width : "50px", height : "50px", bottom: "20px", right: "20px", borderRadius : "100px"}} className="bg-primary position-fixed d-flex align-items-center justify-content-center" >
              <Link to="/chatgpt">
               
                <i
                  className="fa-solid fa-pencil fa-xl text-white cursor-pointer"
               
                ></i>
               
                
              </Link>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

export default CourseContentList;
