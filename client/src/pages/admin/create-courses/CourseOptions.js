import React, {useState} from "react";

const CourseOptions = ({active}) => {
    // const [active, setActive] = useState(0);
    const options = [
      "Course Information",
      "Course Data",
      "Course Content",
      "Course Preview",
    ];
  
    return (
        <div>
        {options.map((option, index) => (
          <div
            key={index}
            className="w-100 d-flex py-3 align-items-center"
          
          >
            <div
              style={{
                width: "35px",
                height: "35px",
                position: "relative",
                backgroundColor: active + 1 > index ? "#007bff" : "#384766",
              }}
              className="rounded-circle d-flex align-items-center justify-content-center"
            >
              <i className="fa-solid fa-check text-white"></i>
              {index !== options.length - 1 && (
                <div
                  style={{
                    position: "absolute",
                    height: "30px",
                    bottom: "-100%",
                    width: "2px",
                    backgroundColor: active + 1 > index ? "#007bff" : "#384766",
                  }}
                ></div>
              )}
            </div>
            <h5
              className="pt-3 ms-3"
              style={{color : active === index ? "#007bff" : "#CCCCCC"}}
            >
              {option}
            </h5>
          </div>
        ))}
      </div>
    );
  };
  
  export default CourseOptions;
