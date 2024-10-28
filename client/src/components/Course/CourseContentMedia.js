import React, { useEffect, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import { Link } from "react-router-dom";
import Avatar from "../../images/default-avatar.png";
import toast, { Toaster } from "react-hot-toast";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewInstructorMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailsQuery,
} from "../../redux/features/courses/coursesApi";
import { format } from "timeago.js";
import VerifiedIcon from "@mui/icons-material/Verified";
import Ratings from "../../utils/Ratings";
import socketIO from "socket.io-client";
import { useSelector } from "react-redux";
const CourseContentMedia = ({
  data,
  id,
  activeVedio,
  setActiveVedio,
  user,
  refetch,
}) => {

  const ENDPOINT = "http://localhost:5000" || "";
  const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

  const [activeBar, setActiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [review, setReview] = useState("");
  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");
  const [reviewId, setReviewId] = useState("");
  const [reply, setReply] = useState("");
  const [isReviewReply, setIsReviewReply] = useState(false);
  
  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailsQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const [addNewQuestion, { isSuccess: questionSuccess, error, isLoading }] =
    useAddNewQuestionMutation({});
  
  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  console.log(courseData);
  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
      refetch: reviewRefetch,
    },
  ] = useAddReviewInCourseMutation({
    refetchOnMountOrArgChange: true,
    refetchOnRejected: true,
    refetchOnError: true,
  });

  const [
    addReplyInReview,
    {
      isLoading: replyCreationLoading,
      error: replyError,
      isSuccess: replySuccess,
    },
  ] = useAddReplyInReviewMutation();
  const [
    addReplyInReviewInstructor,
    {
      isLoading: replyCreationLoadingInstructor,
      error: replyErrorInstructor,
      isSuccess: replySuccessInstructor,
    },
  ] = useAddReplyInReviewInstructorMutation();

  const addReply =
    user.role === "admin" ? addReplyInReview : addReplyInReviewInstructor;

  const course = courseData?.course;
  const questions = course?.courseData[activeVedio]?.questions
  const isReviewExits = course?.review?.find(
    (item) => item.user._id === user._id
  );
  console.log(questions)
  // const isQuestionsExits = course?.courseData[activeVedio]?.questions?.find(
  //   (item) => item.user == user._id
  // );
  // console.log("isQuestionsExits",isQuestionsExits)
  // const isQuestionsRepliesExits = course?.courseData?.questions?.questionReplies.find(
  //   (item) => item.user._id === user._id
  // );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVedio]._id,
      });
    }
  };

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVedio]._id,
      questionId: questionId,
    });
  };

  const handleReviewSubmit = async () => {
    if (review.length === 0) {
      toast.error("Review can't be empty");
    } else {
      await addReviewInCourse({ review, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = async () => {
    const replyIsLoading =
      user.role === "admin"
        ? replyCreationLoading
        : replyCreationLoadingInstructor;
    if (!replyIsLoading) {
      if (reply.length === "") {
        toast.error("Reply can't be empty");
      } else {
        await addReply({ comment: reply, courseId: id, reviewId: reviewId });
      }
    }
  };

  useEffect(() => {
    if (questionSuccess) {
      setQuestion("");
      if (refetch) refetch();
      toast.success("Question added successfully!");
      socketId.emit("notification", {
        title: "New Question Received",
        message: `You have a new question in ${data[activeVedio].title}`,
        user: user._id,
      });
    }
    if (answerSuccess) {
      setAnswer("");
      if (refetch) refetch();
      toast.success("Answer added successfully!");
      if (user.role !== "admin") {
        socketId.emit("notification", {
          title: "New Question Reply Received",
          message: `You have a new question reply ${data[activeVedio].title}`,
          userId: user._id,
        });
      }
    }
    if (reviewSuccess) {
      setReview("");
      setRating(1);
      if (courseRefetch) courseRefetch();
      toast.success("Review added successfully");
      socketId.emit("notification", {
        title: "New Review Received",
        message: `${user.name} has given a review in ${courseData?.course?.name}`,
        userId: user._id,
      });
    }
    const replyReviewSuccess =
      user.role === "admin" ? replySuccess : replySuccessInstructor;
    if (replyReviewSuccess) {
      setReply("");
      if (courseRefetch) courseRefetch();
      toast.success("Reply added successfully");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (answerError) {
      toast.error(answerError?.data?.message);
    }
    if (reviewError) {
      toast.error(reviewError?.data?.message);
    }
    const replyReviewError =
      user.role === "admin" ? replyError : replyErrorInstructor;
    if (replyReviewError) {
      toast.error(replyReviewError?.data?.message);
    }
  }, [
    questionSuccess,
    error,
    answerError,
    answerSuccess,
    reviewSuccess,
    reviewError,
    replySuccess,
    replyError,
    courseRefetch,
    refetch,
  ]);

  // AIzaSyDei9adn_mUp51ZscDLh2hX4PyKKmLx0W0
  return (
    <>
      <div className="py-4 m-auto" style={{ width: "95%" }}>
        <Toaster />
        <CoursePlayer
          title={data[activeVedio]?.title}
          vedioUrl={data[activeVedio]?.vedioUrl}
        />
        <div className="d-flex w-100 align-items-center justify-content-between my-3">
          <div
            className={` btn btn-primary ${
              activeVedio === 0 ? "disabled opacity-50" : ""
            }`}
            onClick={() =>
              setActiveVedio(activeVedio === 0 ? 0 : activeVedio - 1)
            }
            style={{ borderRadius: "50px" }}
          >
            <i className="fa-solid fa-arrow-left mx-2"></i>
            Prev Lesson
          </div>

          <div
            className={` btn btn-primary ${
              data.length - 1 === activeVedio ? "disabled opacity-50" : ""
            }`}
            onClick={() =>
              setActiveVedio(
                data & (data.length - 1 === activeVedio)
                  ? activeVedio
                  : activeVedio + 1
              )
            }
            style={{ borderRadius: "50px" }}
          >
            Next Lesson
            <i class="fa-solid fa-arrow-right mx-2"></i>
          </div>
     </div>
        <h1
          className="pt-2 text-white"
          style={{ fontSize: "25px", fontWeight: "600" }}
        >
          {data[activeVedio].title}
        </h1>
        <br />
        <div
          className="d-flex align-items-center justify-content-between bg-opacity-20 backdrop-blur shadow rounded shadow-inner p-3"
          style={{ backgroundColor: "#5A5A5A" }}
        >
          {["Overviews", "Resources", "Q&A", "Reviews"].map((text, index) => (
            <h5
              key={index}
              className={`cursor-pointer ${
                activeBar === index ? "text-danger" : "text-white"
              }`}
              onClick={() => setActiveBar(index)}
            >
              {text}
            </h5>
          ))}
        </div>
        <br />
        {activeBar === 0 && (
          <p
            className="mb-3 text-white"
            style={{ fontSize: "18px", whiteSpace: "pre-line" }}
          >
            {data[activeVedio].description}
          </p>
        )}
        {activeBar === 1 && (
          <div>
            {data[activeVedio]?.links.map((item, index) => (
              <div className="mb-5">
                <h2 className="text-white" style={{ fontSize: "20px" }}>
                  {item.title && item.title + ":"}

                  <Link
                    to={item.url}
                    style={{ color: "#4395c4", margin: "10px" }}
                  >
                    {item.url}
                  </Link>
                </h2>
              </div>
            ))}
          </div>
        )}
        {activeBar === 2 && (
          <>

            <div>
              <div className="d-flex">
                <div
                  className="default-avatar"
                  style={{ width: "45px", height: "45px", marginRight: "10px" }}
                >
                  <img
                    src={user.avatar ? user.avatar.url : Avatar}
                    alt=""
                    style={{
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  cols="40"
                  rows="5"
                  placeholder="Write your question..."
                  className="form-control bg-transparent border border-light rounded w-90 text-white"
                />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className={`btn btn-primary mt-5`}
                  style={{ cursor: isLoading && "not-allowed" }}
                  onClick={isLoading ? () => {} : handleQuestion}
                >
                  Submit
                </button>
              </div>
            </div>
            <br />
            <br />
            <div
              className="w-100"
              style={{ backgroundColor: "#fffffff3b" }}
            ></div>
            <div>
              <CommentReply
                data={data}
                activeVedio={activeVedio}
                answer={answer}
                setAnswer={setAnswer}
                handleAnswerSubmit={handleAnswerSubmit}
                user={user}
                setQuestionId={setQuestionId}
                isLoading={isLoading}
              />
            </div>
          </>
        )}
        {activeBar === 3 && (
          <div className="w-100">
          
              
                <div className="d-flex ">
                  <div
                    className="default-avatar"
                    style={{
                      width: "45px",
                      height: "45px",
                      marginRight: "10px",
                    }}
                  >
                    <img
                      src={user.avatar ? user.avatar.url : Avatar}
                      alt=""
                      style={{
                        height: "100%",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className="w-100">
                    <h5
                      className="text-white"
                      style={{ fontSize: "20px", fontWeight: "500" }}
                    >
                      Give a Rating <span className="text-danger">*</span>
                    </h5>
                    <div className="d-flex w-100 mx-2 pb-3 my-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <i
                            className="fa-solid fa-star fa-lg cursor-pointer"
                            key={i}
                            style={{ color: "rgb(246,186,0)" }}
                            onClick={() => setRating(i)}
                          ></i>
                        ) : (
                          <i
                            class="fa-regular fa-star fa-lg cursor-pointer"
                            key={i}
                            style={{ color: "rgb(246,186,0)" }}
                            onClick={() => setRating(i)}
                          ></i>
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment..."
                      className="form-control text-white bg-transparent border border-light rounded w-90"
                    ></textarea>
                  </div>
                </div>
                <div className="d-flex justify-content-end">
                  <button
                    className={`btn btn-primary mt-5 `}
                    style={{ cursor: reviewCreationLoading && "no-drop" }}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewSubmit
                    }
                  >
                    Submit
                  </button>
                </div>
              
           
            <br />
            <div
              className="w-100"
              style={{ backgroundColor: "#ffffff3b", height: "1px" }}
            ></div>
            <div className="w-100">
              {course?.review &&
                [...course.review].reverse().map((item, index) => (
                  <>
                    <div className="w-100 my-5" key={index}>
                      <div className="w-100 d-flex">
                        <div>
                          <div
                            style={{ width: "50px", height: "50px" }}
                            className="d-flex flex-column align-items-center"
                          >
                            <div
                              className="default-avatar"
                              style={{
                                width: "45px",
                                height: "45px",
                                marginRight: "10px",
                              }}
                            >
                              <img
                                src={
                                  user.avatar
                                    ? user.avatar.url
                                    : Avatar
                                }
                                alt=""
                                style={{
                                  height: "100%",
                                  borderRadius: "50%",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mx-2">
                          <h1
                            className="text-white"
                            style={{ fontSize: "18px" }}
                          >
                            {user.name}{" "}
                          </h1>
                          <Ratings rating={item.rating} />
                          <p className="text-white">{item.comment}</p>
                          <small style={{ color: "#ffffff83" }}>
                            {format(item.createdAt)}
                          </small>
                        </div>
                      </div>
                      <span
                        className="text-white cusror-pointer"
                        style={{ marginLeft: "55px" }}
                        onClick={() => {
                          setIsReviewReply(item._id);
                          setReviewId(item._id);
                        }}
                      >

                        Add Reply
                        {/* {!isReviewReply
                          ? item.commentReplies.length !== 0
                            ? "All Replies"
                            : "Add Reply"
                          : "Hide Replies"} */}
                        <i
                          className="fa-regular fa-message fa-lg cursor-pointer"
                          style={{ color: "#ffffff83", marginLeft: "10px" }}
                        ></i>
                        <span
                          className="cursor-pointer"
                          style={{
                            color: "#ffffff83",
                            marginLeft: "5px",
                            marginTop: "-10px",
                          }}
                        >
                          {item.commentReplies.length}
                        </span>
                      </span>
                      {user.role === "instructor" && (
                        <span
                          className="text-white cusror-pointer"
                          style={{ marginLeft: "55px" }}
                          onClick={() => {
                            setIsReviewReply(item._id);
                            setReviewId(item._id);
                          }}
                        >
                          Add Reply
                          {/* {!isReviewReply
                            ? item.commentReplies.length !== 0
                              ? "All Replies"
                              : "Add Reply"
                            : "Hide Replies"} */}
                          <i
                            className="fa-regular fa-message fa-lg cursor-pointer"
                            style={{ color: "#ffffff83", marginLeft: "10px" }}
                          ></i>
                          <span
                            className="cursor-pointer"
                            style={{
                              color: "#ffffff83",
                              marginLeft: "5px",
                              marginTop: "-10px",
                            }}
                          >
                            {item.commentReplies.length}
                          </span>
                        </span>
                      )}
                      {isReviewReply && isReviewReply === item._id && (
                        <div className="w-100 position-relative d-flex align-items-center">
                          <input
                            type="text"
                            name=""
                            id=""
                            placeholder="Enter you reply..."
                            value={reply}
                            onChange={(e) => setReply(e.target.value)}
                            className={`form-control bg-transparent text-white border-0 border-bottom border-white-50 p-1 rounded-0`}
                            style={{
                              width: "90%",

                              outline: "none",
                              marginLeft: "8%",
                              cursor:
                                review === "" ||
                                (reviewCreationLoading && "not-allowed"),
                            }}
                          />
                          <button
                            className="text-white position-absolute bg-transparent"
                            type="submit"
                            style={{
                              right: "10px",
                              bottom: "10px",
                              border: "none",
                            }}
                            onClick={
                              reviewCreationLoading
                                ? null
                                : handleReviewReplySubmit
                            }
                            disabled={reply === "" || reviewCreationLoading}
                          >
                            Submit
                          </button>
                        </div>
                      )}
                      {item.commentReplies &&
                        Object.values(item.commentReplies).map((reply, i) => (
                          <div className="w-100 d-flex my-5 text-white" key={i}>
                            <div
                              className="default-avatar"
                              style={{
                                width: "45px",
                                height: "45px",
                                marginRight: "10px",
                              }}
                            >
                              <img
                                src={
                                  reply.user?.avatar
                                    ? reply.user?.avatar.url
                                    : Avatar
                                }
                                alt=""
                                style={{ height: "100%", borderRadius: "50%" }}
                              />
                            </div>
                            <div className="px-2">
                              <div className="d-flex w-100 align-items-center gap-2">
                                <h5 className="" style={{ fontSize: "20px" }}>
                                  {reply.user?.name}
                                </h5>
                                {reply.user?.role === "admin" && (
                                  <VerifiedIcon
                                    style={{
                                      color: "#0d6efd",
                                      fontSize: "20px",
                                    }}
                                  />
                                )}
                                {reply.user?.role === "instructor" && (
                                  <VerifiedIcon
                                    style={{
                                      color: "red",
                                      fontSize: "20px",
                                    }}
                                  />
                                )}
                              </div>

                              <p className="mb-0">{reply.comment}</p>
                              <small style={{ color: "#ffffff83" }}>
                                {format(reply.createdAt)}
                              </small>
                            </div>
                          </div>
                        ))}
                    </div>
                  </>
                ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

const CommentReply = ({
  data,
  activeVedio,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  isLoading,
  isQuestionExits,
  isQuestionsRepliesExits
}) => {
  return (
    <>
      <div className="w-100 my-3">
        <div
          className="w-100"
          style={{ backgroundColor: "#ffffff3b", height: "1px" }}
        ></div>
  
        {data[activeVedio].questions.map((item, index) => (
          <CommentItem
            key={index}
            data={data}
            activeVedio={activeVedio}
            item={item}
            setAnswer={setAnswer}
            answer={answer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            user={user}
            isLoading={isLoading}
          />
        ))}
     


        
      </div>
    </>
  );
};

const CommentItem = ({
  item,
  answer,
  setAnswer,
  setQuestionId,
  handleAnswerSubmit,
  user,
  isLoading,
}) => {
  console.log("item", item)
  const [replyActive, setReplyActive] = useState(false);
  
  return (
    <>
      <div className="my-3">
        <div className="d-flex mb-2">
          <div
            style={{ width: "50px", height: "50px" }}
            className="d-flex flex-column align-items-center"
          >
            <div
              className="default-avatar"
              style={{
                width: "45px",
                height: "45px",
                marginRight: "10px",
              }}
            >
              <img
                src={item?.user?.avatar ? item.user.avatar.url : Avatar}
                alt=""
                style={{
                  height: "100%",
                  borderRadius: "50%",
                }}/>
            </div>
          </div>
          <div className="px-3">
            <h5 className="text-white" style={{ fontSize: "20px" }}>
              {item.user.name}
            </h5>
            <p className="text-white mb-0">{item.question}</p>
            <small style={{ color: "#ffffff83" }}>
              {!item.createdAt ? "" : format(item.createdAt)}
            </small>
          </div>
        </div>
        <div className="w-100 d-flex mt-4">
          <span
            className="cursor-pointer"
            style={{ color: "#ffffff83", marginLeft: "65px" }}
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Reply"
              : "Hide Replies"}
          </span>

          <i
            className="fa-regular fa-message fa-lg cursor-pointer"
            style={{ color: "#ffffff83", marginLeft: "10px" }}
          ></i>
          <span
            className="cursor-pointer"
            style={{
              color: "#ffffff83",
              marginLeft: "5px",
              marginTop: "-10px",
            }}
          >
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive&& (
          <>
            {item.questionReplies.map((reply) => (
              <div className="w-100 d-flex my-5 text-white">
                <div
                  className="default-avatar"
                  style={{
                    width: "45px",
                    height: "45px",
                    marginRight: "10px",
                  }}
                >
                  <img
                    src={reply.user.avatar ? reply.user.avatar.url : Avatar}
                    alt=""
                    style={{
                      height: "100%",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div className="px-2">
                  <div className="d-flex w-100 align-items-center gap-2">
                    <h5 className="" style={{ fontSize: "20px" }}>
                      {reply.user.name}
                    </h5>
                    {reply.user.role === "admin" && (
                      <VerifiedIcon
                        style={{ color: "#0d6efd", fontSize: "20px" }}
                      />
                    )}
                    {reply.user.role === "instructor" && (
                      <VerifiedIcon
                        style={{ color: "red", fontSize: "20px" }}
                      />
                    )}
                  </div>

                  <p className="mb-0">{reply.answer}</p>
                  <small style={{ color: "#ffffff83" }}>
                    {format(reply.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-100 position-relative d-flex align-items-center">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className={` bg-transparent text-white border-0 border-bottom border-white-50 p-1`}
                  style={{
                    width: "95%",
                    outline: "none",
                    boxShadow : "none",
                    cursor: answer === "" || (isLoading && "not-allowed"),
                  }}
                />

                <button
                  className="text-white position-absolute bg-transparent"
                  type="submit"
                  style={{ right: "10px", bottom: "10px", border: "none" }}
                  onClick={isLoading ? null : handleAnswerSubmit}
                  disabled={answer === "" || isLoading}
                >
                  Submit
                </button>
              </div>

              <br />
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
