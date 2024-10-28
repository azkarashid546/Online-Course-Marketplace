import React, { useEffect, useState } from "react";
import { useGetHeroDataQuery } from "../../redux/features/layout/layoutApi";

const FAQ = () => {
  const { data, isLoading } = useGetHeroDataQuery("FAQ", {});
  const [activeQuestion, setActiveQuestion] = useState([]);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (data) {
      setQuestions(data?.layout.faq);
    }
  }, [data]);

  const toggleQuestions = (id) => {
    setActiveQuestion(activeQuestion === id ? null : id);
  };
  return (
    <>
      <div className="faq" style={{marginTop : "130px"}}>
        <h1 className="text-white text-center" style={{ fontSize: "35px" }}>
          Frequently Asked Questions
        </h1>
        <div className="container" style={{ marginTop: "70px" }}>
          <div className="mt-5">
            <div className="accordion" id="faqAccordion">
              {questions.map((q) => (
                <div
                  className="card"
                  key={q._id}
                  style={{
                    backgroundColor: "transparent",
                    color: "white",
                    border: "none",
                  }}
                >
                  <div
                    className="card-header"
                    //   id={`heading${index}`}
                    style={{
                      backgroundColor: "transparent",
                      borderTop: q._id !== questions[0]?._id && "2px solid gray",
                      borderBottom : "none"
                    }}
                  >
                    <h2 className="mb-0">
                      <button
                        className="text-left d-flex justify-content-between w-100 align-items-center mb-4 mt-3"
                        type="button"
                        data-toggle="collapse"
                        //   data-target={`#collapse${index}`}
                        //   aria-expanded="true"
                        //   aria-controls={`collapse${index}`}
                        onClick={() => toggleQuestions(q._id)}
                        style={{
                          color: "white",
                          backgroundColor: "transparent",
                          border: "none",
                          fontSize: "16px",
                        }}
                      >
                        <span>{q.question}</span>
                        <span className="ml-3">
                          {activeQuestion === q._id ? (
                            <i className="fa-solid fa-minus"></i>
                          ) : (
                            <i className="fa-solid fa-plus"></i>
                          )}
                        </span>
                      </button>
                    </h2>
                  </div>

                  {activeQuestion === q._id && (
                    <div
                      //   id={`collapse${index}`}
                      //   className={`collapse ${q.activeQuestion ? "show" : ""}`}
                      //   aria-labelledby={`heading${index}`}
                      data-parent="#faqAccordion"
                    >
                      <div className="card-body mt-4">
                        <span>{q.answer}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
