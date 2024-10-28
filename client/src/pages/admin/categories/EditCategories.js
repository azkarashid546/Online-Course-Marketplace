import React, { useState, useEffect } from "react";
import {
  useEditLayoutMutation,
  useGetHeroDataQuery,
} from "../../../redux/features/layout/layoutApi";
import Loader from "../../../components/Loader/Loader";
import toast, { Toaster } from "react-hot-toast";

const EditCategories = () => {
  const { isLoading, data, refetch } = useGetHeroDataQuery("Categories", {
    refetchOnMountOrArgChange: true,
  });
  
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [categories, setCategories] = useState([]);

  // Set categories from fetched data when the component mounts or data changes
  useEffect(() => {
    if (data && data.layout && data.layout.categories) {
      setCategories(data.layout.categories);
    }
    if (isSuccess) {
        refetch()
      toast.success("Categories updated successfully");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, error]);

  const handleCategoriesAdd = (id, value) => {
    setCategories((prevCategory) =>
      prevCategory.map((i) =>
        i._id === id ? { ...i, title: value } : i
      )
    );
  };

  const handleCategoriesHandler = () => {
    if (categories[categories.length - 1]?.title === "") {
      toast.error("Category title cannot be empty");
    } else {
      setCategories((prevCategory) => [...prevCategory, { title: "" }]);
    }
  };

  const areCategoriesUnchanged = (originalCategories, newCategories) => {
    return JSON.stringify(originalCategories) === JSON.stringify(newCategories);
  };

  const isAnyCategoryTitleEmpty = (categories) => {
    return categories.some((category) => category.title === "");
  };

  const editCategoriesHandler = async () => {
    if (!areCategoriesUnchanged(data.layout.categories, categories) && !isAnyCategoryTitleEmpty(categories)) {
      await editLayout({
        type: "Categories",
        categories,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="text-center" style={{ marginTop: "50px" }}>
          <Toaster />
          <h1 className="text-white">All Categories</h1>
          <div className="d-flex align-items-center justify-content-center mt-5" style={{ flexDirection: "column" }}>
            {categories &&
              categories.map((item, index) => (
                <div className="p-3" key={item._id}>
                  <div className="d-flex align-items-center mb-1">
                    <input
                      type="text"
                      required
                      className="bg-transparent border-0 text-white"
                      id="question"
                      name="question"
                      style={{
                        outline: "none",
                        width: "100%",
                      }}
                      onChange={(e) =>
                        handleCategoriesAdd(item._id, e.target.value)
                      }
                      value={item.title}
                      placeholder="Enter Category Title..."
                    />
                    <i
                      className="fa-solid fa-trash text-white cursor-pointer"
                      onClick={() => {
                        setCategories((prevCategory) =>
                          prevCategory.filter((i) => i._id !== item._id)
                        );
                      }}
                    ></i>
                  </div>
                </div>
              ))}
          </div>
          <br />
          <br />
          <br />

          <i className="fa-solid fa-plus text-white" onClick={handleCategoriesHandler}></i>
           <div className="d-flex align-items-end justify-content-end">
          <div
            className={`btn btn-primary mt-4 ${areCategoriesUnchanged(data?.layout?.categories, categories) || 
            isAnyCategoryTitleEmpty(categories) ? "disabled" : "cursor-pointer"
            }`}
            onClick={
              areCategoriesUnchanged(data?.layout?.categories, categories) || 
              isAnyCategoryTitleEmpty(categories) ? () => null : editCategoriesHandler
            }
          >
            Save
          </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCategories;
