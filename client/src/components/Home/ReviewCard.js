import React from "react";
import Ratings from "../../utils/Ratings";

const ReviewCard = ({ item, index }) => {
  return (
    <>
      <div className="card" style={{backgroundColor : "#5B5B5B", objectFit : "cover"}} >
        <div className="card-body">
         
          <div className="d-flex gap-2">
            <div className="avatar-image" style={{width : "70px", height : "70px", objectFit : "cover"}}>
            <img src={item?.avatar} alt=""style={{width : "100%", height : "100%", borderRadius : "50%", objectFit : "cover"}}/>
            </div>
            <div className="d-flex justify-content-between w-100">
                <div className="pl-4">
                    <h5 className="text-white" style={{fontSize : "20px"}}>
                        {item.name}
                    </h5>
                    <h6 className="text-white" style={{fontSize : "15px"}}>
                      {item.profession}
                    </h6>
                </div>
                <Ratings rating = {5}/>
            </div>
          </div>
          <p className="text-white pt-2 px-2">
            {item.comment}
          </p>
        </div>
      </div>
    </>
  );
};

export default ReviewCard;
