import React from "react";
import ReviewsImage from "../../images/reviews.png";
import ReviewCard from "./ReviewCard";
const Reviews = () => {
  const reviews = [
    {
      name: "Azka Rashid",
      avatar:
        "https://tse3.mm.bing.net/th?id=OIP.UL-1DMfhVszKjcYlgEespAD0D_&pid=Api&P=0&h=220",
      profession: "Junior web developer | Indonesia",
      comment:
        "Loream ipsum is good person Loream ipsum is good person Loream ipsum is good person Loream ipsum is good person Loream ipsum is good person",
    },
    {
      name: "Azka Rashid",
      avatar:
        "https://tse3.mm.bing.net/th?id=OIP.UL-1DMfhVszKjcYlgEespAD0D_&pid=Api&P=0&h=220",
      profession: "Junior web developer | Indonesia",
      comment: "Loream ipsum is good person",
    },
    {
      name: "Azka Rashid",
      avatar:
        "https://tse3.mm.bing.net/th?id=OIP.UL-1DMfhVszKjcYlgEespAD0D_&pid=Api&P=0&h=220",
      profession: "Junior web developer | Indonesia",
      comment: "Loream ipsum is good person",
    },
    {
      name: "Azka Rashid",
      avatar:
        "https://tse3.mm.bing.net/th?id=OIP.UL-1DMfhVszKjcYlgEespAD0D_&pid=Api&P=0&h=220",
      profession: "Junior web developer | Indonesia",
      comment: "Loream ipsum is good person",
    },
    {
      name: "Azka Rashid",
      avatar:
        "https://tse3.mm.bing.net/th?id=OIP.UL-1DMfhVszKjcYlgEespAD0D_&pid=Api&P=0&h=220",
      profession: "Junior web developer | Indonesia",
      comment: "Loream ipsum is good person",
    },
  ];
  return (
    <>
      <div className="row" style={{ marginTop: "100px" }}>
        <div className="col-md-6 col-12">
          <div
            className="reviews-image"
            style={{ width: "100%", height: "100%" }}
          >
            <img
              src={ReviewsImage}
              alt=""
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </div>
        <div className="col-md-6 col-12">
          <h3
            className="text-center text-white mt-5"
            style={{ fontSize: "30px" }}
          >
            Our Students Are <span className="text-primary">Our Strength</span>
            <br />
            See What They Say About Us
          </h3>
          <p className="text-white mt-3">
            Our ELearning Platform is built not only to provide comprehensive
            educational content but also to ensure that users' experiences and
            feedback are at the forefront of our continuous improvement efforts.
            Thousands of students have successfully leveraged our platform to
            achieve their learning goals, and their reviews speak volumes about
            the quality and impact of our courses.
          </p>
        </div>
       
        <div className="row mt-5">
          {reviews.map((item, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <ReviewCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
