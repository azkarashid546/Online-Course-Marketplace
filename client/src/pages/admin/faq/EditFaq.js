import React, { useEffect, useState } from "react";
import { useEditLayoutMutation, useGetHeroDataQuery } from "../../../redux/features/layout/layoutApi";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../../../components/Loader/Loader";

const EditFaq = () => {
  const { isLoading, data, refetch } = useGetHeroDataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });

  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout.faq);
    }
    if (isSuccess) {
      refetch();
      toast.success("FAQ updated successfully!");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [data, isSuccess, error, refetch]);

  const toggleQuestions = (id) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, active: !q.active } : q
      )
    );
  };

  const handleQuestionChange = (id, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, question: value } : q
      )
    );
  };

  const handleAnswerChange = (id, value) => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q._id === id ? { ...q, answer: value } : q
      )
    );
  };

  const newFaqHandler = () => {
    setQuestions([
      ...questions,
      { _id: Date.now().toString(), question: "", answer: "", active: true }
    ]);
  };

  const areQuestionsUnchanged = (originalQuestions, newQuestions) => {
    return JSON.stringify(originalQuestions) === JSON.stringify(newQuestions);
  };

  const isAnyQuestionEmpty = (questions) => {
    return questions.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    if (!areQuestionsUnchanged(data.layout.faq, questions) && !isAnyQuestionEmpty(questions)) {
      await editLayout({
        type: "FAQ",
        faq: questions
      });
    }
  };

  return (
    <>
      {isLoading ? (<Loader />) : (
        <div className="container" style={{ marginTop: "120px" }}>
          <Toaster />
          <div className="mt-5">
            <div className="accordion" id="faqAccordion">
              {questions.map((q, index) => (
                <div className="card" key={q._id} style={{ backgroundColor: "transparent", color: "white", border : "none"}}>
                  <div className="card-header" id={`heading${index}`} style={{backgroundColor : "transparent",  borderTop : q._id !== questions[0]?._id && "2px solid gray", borderBottom : "none"}}>
                    <h2 className="mb-0">
                      <button
                        className="text-left d-flex justify-content-between w-100 align-items-center mb-4 mt-3"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#collapse${index}`}
                        aria-expanded="true"
                        aria-controls={`collapse${index}`}
                        onClick={(e) =>{toggleQuestions(q._id)
                          e.preventDefault()
                        }}
                        style={{ color: "white" , backgroundColor : "transparent", border : "none", fontSize : "16px"}}
                      >
                        <input
                          type="text"
                          required
                          className="bg-transparent border-0 text-white"
                          id="question"
                          name="question"
                          style={{ outline: "none", width: "100%" }}
                          onChange={(e) => handleQuestionChange(q._id, e.target.value)}
                          value={q.question}
                          placeholder="Add your Question..."
                        />
                        <span className="ml-3">
                          {q.active ? (
                            <i className="fa-solid fa-minus"></i>
                          ) : (
                            <i className="fa-solid fa-plus"></i>
                          )}
                        </span>
                      </button>
                    </h2>
                  </div>

                  <div
                    id={`collapse${index}`}
                    className={`collapse ${q.active ? 'show' : ''}`}
                    aria-labelledby={`heading${index}`}
                    data-parent="#faqAccordion"
                  >
                    <div className="card-body mt-4">
                      <input
                        type="text"
                        required
                        className="bg-transparent border-0 text-white"
                        style={{ outline: "none", width: "100%" }}
                        id="answer"
                        name="answer"
                        onChange={(e) => handleAnswerChange(q._id, e.target.value)}
                        value={q.answer}
                        placeholder="Add your Answer..."
                      />
                      <span className="ml-3">
                        <i
                          className="fa-solid fa-trash text-white cursor-pointer mt-3"
                          onClick={() => {
                            setQuestions((prevQuestions) =>
                              prevQuestions.filter((item) => item._id !== q._id)
                            );
                          }}
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <br />
            <i className="fa-solid fa-plus text-white cursor-pointer" onClick={newFaqHandler}></i>
            <br /><br /><br />
            <div className="d-flex justify-content-end">
              <button
                className={`btn btn-primary ${isAnyQuestionEmpty(questions) ? 'disabled' : ''}`}
                onClick={handleEdit}
                disabled={areQuestionsUnchanged(data?.layout?.faq, questions) || isAnyQuestionEmpty(questions)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
