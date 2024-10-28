const Ratings = ({ rating }) => {
  const stars = [];
  const roundedRating = Math.round(rating * 2) / 2; // Round to nearest half

  for (let i = 1; i <= 5; i++) {
    if (i <= roundedRating) {
      stars.push(
        <i
          className="fa-solid fa-star mr-2 cursor-pointer"
          key={i}
          style={{ color: "#f6b100" }}
        ></i>
      );
    } else if (i - 0.5 === roundedRating) {
      stars.push(
        <i
          className="fa-solid fa-star-half-stroke mr-2 cursor-pointer"
          key={i}
          style={{ color: "#f6b100" }}
        ></i>
      );
    } else {
      stars.push(
        <i
          className="fa-regular fa-star mr-2 cursor-pointer"
          key={i}
          style={{ color: "#f6b100" }}
        ></i>
      );
    }
  }

  return <div className="d-flex mt-1 ml-2">{stars}</div>;
};

export default Ratings;
