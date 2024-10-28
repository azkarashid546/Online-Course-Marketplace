import axios from "axios";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import ReactMarkdown from "react-markdown";
const Chatgpt = () => {
  const [message, setMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (transcript) {
      setValue(transcript);
    }
  }, [transcript]);

  useEffect(() => {
    if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
      console.log("Your browser does not support speech recognition.");
      return;
    }
  }, []);

  useEffect(() => {
    if (!currentTitle && value && message) {
      setCurrentTitle(value);
    }

    if (currentTitle && value && message) {
      setPreviousChats((prevChats) => [
        ...prevChats,
        {
          title: currentTitle,
          role: "user",
          content: value,
        },
        {
          title: currentTitle,
          role: message.role,
          content: message.content,
        },
      ]);
    }
  }, [message, currentTitle, value]);

  const createNewChat = () => {
    setCurrentTitle(null);
    setValue("");
    setMessage(null);
    resetTranscript();
  };

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setValue("");
    setMessage(null);
    resetTranscript();
  };

  const getMessages = async () => {
    setMessages((prev) => [
      ...prev,
      {
        message: value,
        id: 1, // 1 for user
      },
    ]);
    setValue("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/completions",
        { message: value }
      );
      setMessages((prev) => [
        ...prev,
        {
          message: response.data.message,
          id: 2, // 2 for AI
        },
      ]);
      // speak(response.data.message); // Convert response to speech
    } catch (error) {
      console.error("Error occurred while fetching messages:", error);
      setMessage({
        content: "An error occurred while processing your request.",
      });
    }
  };

  const handleListening = () => {
    if (isListening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
    setIsListening(!isListening);
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const currentChat = previousChats.filter(
    (previousChat) => previousChat.title === currentTitle
  );

  const uniqueTitles = Array.from(
    new Set(previousChats.map((previousChat) => previousChat.title))
  );

  const PointList = ({ inputString }) => {
    if (!inputString) return null; 
  
    const points = inputString.split("\n").map((line) => {
      const match = line.match(/^\* (.+)$/);
      if (!match) return null;
  
      const [_, title] = match;
      const boldTitle = title.startsWith('**') && title.endsWith('**')
        ? <strong>{title.slice(2, -2)}</strong>
        : title;
      return (
        <ul key={title}>
          <li style={{ listStyle: "disc" }}>{boldTitle}</li>
        </ul>
      );
    });
    
    return (
      <ul>
        {points}
      </ul>
    );
  };
  
  const parseMarkdown = (text) => {
    const paragraphs = text.split("\n\n");
    const markdownParagraphs = [];
  
    paragraphs.forEach((paragraph) => {
      if (paragraph.startsWith("**") || paragraph.startsWith("##")) {
        markdownParagraphs.push(<PointList inputString={paragraph} />);
      } else {
        markdownParagraphs.push(<ReactMarkdown children={paragraph} />);
      }
    });
  
    return markdownParagraphs;
  };
  
  return (
    <div className="container">
      <div className="d-flex gap-3">
        <section
          className="p-2 bg-dark text-white h-100 d-flex flex-column justify-between align-items-center"
          style={{ width: "355px" }}
        >
          <button
            className="btn btn-outline-light w-100 p-2.5 m-2.5"
            onClick={createNewChat}
          >
            + New Chat
          </button>
          <nav className="border-top w-100 p-3.5 text-white">
            <p>ELearning</p>
          </nav>
        </section>
        <section className="h-100 w-100 d-flex flex-column justify-between align-items-center">
          <h1 className="text-25 text-white">ELearning GPT</h1>
          <ul className="w-100 h-100 p-0 text-20 overflow-auto">
            {messages &&
              messages.map((item, index) => (
                <li key={index} className="bg-secondary w-100 p-3 mx-0 my-5">
                  <p className={`min-w-100 text-white`}>
                    {item.id === 1 ? "You: " : "Assistant: "}
                  </p>
                  {parseMarkdown(item.message)}
                </li>
              ))}
          </ul>
          <div className="w-100 d-flex flex-column justify-center align-items-center">
            <div className="position-relative w-100 max-w-650">
              <input
                className="w-100 border-0 bg-secondary px-3 py-2 rounded shadow-sm text-20 text-white"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <div
                id="submit"
                className="position-absolute top-0 end-0 me-3 mt-3 cursor-pointer text-25 "
                onClick={getMessages}
              >
                <i className="fa-solid fa-paper-plane text-white"></i>
              </div>
              <button
                onClick={handleListening}
                className="btn btn-outline-light mt-3"
              >
                {isListening ? "Stop Listening" : "Start Listening"}
              </button>
              <button
                onClick={() => speak(value)}
                className="btn btn-outline-light mt-3"
              >
                Speak
              </button>
            </div>
            <p className="p-3.5 text-secondary text-14">
              Chat GPT Mar version. Free Research Preview. Our goal is to make
              AI systems more natural and safe to interact with. Your feedback
              will help us improve.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Chatgpt;
