import React, { useEffect, useState } from "react";
import axios from "axios";
const CoursePlayer = ({ vedioUrl }) => {
  const [vedioData, setVedioData] = useState({
    otp: "",
    playbackInfo: "",
  });
  useEffect(() => {
    axios
      .post(`http://localhost:5000/api/v1/getVdoCipherOTP`, {
        videoId: vedioUrl,
      })
      .then((res) => {
        setVedioData(res.data);
      });
  }, [vedioUrl]);
  return (
    <>
      <div style={{ paddingTop : "56.25%", position: "relative",overflow : "hidden" }}>
        {vedioData.otp && vedioData.playbackInfo !== "" && (
          <iframe
            src={`https://player.vdocipher.com/v2/?otp=${vedioData.otp}&playbackInfo=${vedioData.playbackInfo}&player=ivb3xxjHlC2LEsW5`}
            style={{
              border: 0,
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              left: 0,
            }}
            allowFullScreen={true}
            allow="encrypted-media"
          ></iframe>
        )}
      
      </div>
    </>
  );
};

export default CoursePlayer;
