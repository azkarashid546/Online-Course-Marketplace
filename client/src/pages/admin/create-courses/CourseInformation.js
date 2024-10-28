  import React, { useEffect, useState } from "react";
  import { useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";

  const CourseInformation = ({
    courseInfo,
    setCourseInfo,
    active,
    setActive,
    handleNext,
  }) => {
    const [dragging, setDragging] = useState(false);
    const [isFocused, setIsFocused] = useState(true);
    const { data } = useGetHeroDataQuery("Categories", {});
    const [categories, setCategories] = useState([]);
    useEffect(() => {
    if(data)
      setCategories(data.layout.categories);
    },[data])
    const handleSubmit = (e) => {
      e.preventDefault();
      setActive(active + 1);
    };
    const handleFileChange = (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          // const data = e.target.result;
          // const blob = new Blob([data], {type: 'application/pdf'});
          // setCourseInfo({...courseInfo, pdf: blob});
          // };
          // reader.readAsDataURL(file);
          if (reader.readyState === 2) {
            setCourseInfo({ ...courseInfo, thumbnail: reader.result });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    const handleDragOver = (e) => {
      e.preventDefault();
      setDragging(true);
    };
    const handleDragLeave = (e) => {
      e.preventDefault();
      setDragging(false);
    };
    const handleDrop = (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        };
        reader.readAsDataURL(file);
      }
    };

    return (
      <>
        <div style={{ width: "80%", margin: "auto", marginTop: "24px" }}>
          <form onSubmit={handleNext}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">
                Course Name
              </label>
              <input
                type="text"
                required
                className={`form-control`}
                id="name"
                name="name"
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, name: e.target.value })
                }
                value={courseInfo.name}
                placeholder="Mern stack LMS platform"
                style={{
                  outline: "none",
                  backgroundColor: isFocused ? "transparent" : "",
                  color: "white",
                }}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label text-white">
                Course Description
              </label>
              <br />
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="8"
                className="p-2"
                placeholder="Writing something amazing..."
                value={courseInfo.description}
                onChange={(e) =>
                  setCourseInfo({ ...courseInfo, description: e.target.value })
                }
                p
                style={{
                  border: "2px solid gray",
                  width: "100%",
                  outline: "none",
                  backgroundColor: isFocused ? "transparent" : "",
                  color: "white",
                }}
              ></textarea>
            </div>
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div className="mb-3">
                <label htmlFor="price" className="form-label text-white">
                  Course Price
                </label>
                <input
                  type="number"
                  required
                  className="form-control"
                  id="price"
                  name="price"
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, price: e.target.value })
                  }
                  value={courseInfo.price}
                  placeholder="29"
                  style={{
                    outline: "none",
                    backgroundColor: isFocused ? "transparent" : "",
                    color: "white",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="estimatedPrice" className="form-label text-white">
                  Estimated Price (Optional)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="estimatedPrice"
                  name="estimatedPrice"
                  onChange={(e) =>
                    setCourseInfo({
                      ...courseInfo,
                      estimatedPrice: e.target.value,
                    })
                  }
                  value={courseInfo.estimatedPrice}
                  placeholder="79"
                  style={{
                    outline: "none",
                    backgroundColor: isFocused ? "transparent" : "",
                    color: "white",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div className="mb-3">
                <label htmlFor="tags" className="form-label text-white">
                  Course Tags
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="tags"
                  name="tags"
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, tags: e.target.value })
                  }
                  value={courseInfo.tags}
                  placeholder="MERN, Bootstarp, React, Socketio, css LMS"
                  style={{
                    outline: "none",
                    backgroundColor: isFocused ? "transparent" : "",
                    color: "white",
                  }}
                />
              </div>
              <div className="mb-3">
            <label htmlFor="categories" className="form-label text-white">
              Course Categories
            </label>
            <select
              id="categories"
              className="form-control select-dark-options w-100 bg-transparent text-white"
              value={courseInfo.categories}
              onChange={(e) => setCourseInfo({ ...courseInfo, categories: e.target.value })}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option value={category.title} key={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
            </div>
            <div
              style={{
                display: "grid",
                gap: "20px",
                gridTemplateColumns: "1fr 1fr",
              }}
            >
              <div className="mb-3">
                <label htmlFor="level" className="form-label text-white">
                  Course Level
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="level"
                  name="level"
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, level: e.target.value })
                  }
                  value={courseInfo.level}
                  placeholder="Beginner/Intermediate/Expert"
                  style={{
                    outline: "none",
                    backgroundColor: isFocused ? "transparent" : "",
                    color: "white",
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="demoUrl" className="form-label text-white">
                  Demo Url
                </label>
                <input
                  type="text"
                  required
                  className="form-control"
                  id="demoUrl"
                  name="demoUrl"
                  onChange={(e) =>
                    setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                  }
                  value={courseInfo.demoUrl}
                  placeholder="ee745d"
                  style={{
                    outline: "none",
                    backgroundColor: isFocused ? "transparent" : "",
                    color: "white",
                  }}
                />
              </div>
            </div>
            <div className="w-100">
              <input
                type="file"
                accept="image/*"
                id="file"
                className="d-none"
                onChange={handleFileChange}
              />
              <label
                htmlFor="file"
                className={`form-label text-white border p-3 d-flex align-items-center justify-content-center ${
                  dragging ? "bg-primary" : "bg-transparent"
                }`}
                //   style = {{

                //   }}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{
                  width: "100%",
                  minHeight: "30vh",
                  borderColor: dragging ? "#00000026" : "inherit",
                }}
              >
                {courseInfo.thumbnail ? (
                  <img
                    src={courseInfo.thumbnail}
                    alt=""
                    className="img-fluid"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <span className="text-black dark:text-white">
                    Drag and drop your thumbnail here or click to browse
                  </span>
                )}
              </label>
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "end",
              }}
            >
              <input type="submit" value="Next" className="btn btn-primary" />
            </div>
          </form>
        </div>
      </>
    );
  };

  export default CourseInformation;
