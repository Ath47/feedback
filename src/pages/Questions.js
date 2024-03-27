import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Questions() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState(Array(5).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const questions = [
    "How satisfied are you with our products? (On a scale of 1-5)",
    "How fair are the prices compared to similar retailers? (On a scale of 1-5)",
    "How satisfied are you with the value for money of your purchase? (On a scale of 1-5)",
    "On a scale of 1-10 how would you recommend us to your friends and family? (On a scale of 1-10)",
    "What could we do to improve our service? ",
  ];

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleResponseChange = (e) => {
    const newResponses = [...responses];
    newResponses[currentQuestion] = e.target.value;
    setResponses(newResponses);
  };

  const handleSubmit = async () => {
    if (window.confirm("Are you sure you want to submit the survey?")) {
      try {
        const surveyData = {
          Ans1: responses[0] || null,
          Ans2: responses[1] || null,
          Ans3: responses[2] || null,
          Ans4: responses[3] || null,
          Ans5: responses[4] || null,
        };
        const response = await fetch("http://localhost:5000/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(surveyData),
        });
        console.log("Data submitted to the database:", response);
        setSubmitted(true);
        setTimeout(() => navigate("/"), 3000);
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      {!submitted ? (
        <div>
          <form className="bg-slate-600 p-2 rounded-lg h-60 text-center">
            <p>
              {" "}
              Q. {currentQuestion + 1}⁄{questions.length}
            </p>
            <h2>{questions[currentQuestion]}</h2>

            {currentQuestion === 4 ? (
              <textarea
                value={responses[currentQuestion] || ""}
                onChange={handleResponseChange}
              />
            ) : (
              <div className="flex justify-center">
                {[...Array(currentQuestion === 3 ? 10 : 5).keys()].map(
                  (value) => (
                    <label key={value + 1} className="inline-block m-2">
                      <input
                        type="radio"
                        name={`question${currentQuestion}`}
                        value={value + 1}
                        checked={
                          parseInt(responses[currentQuestion]) === value + 1
                        }
                        onChange={handleResponseChange}
                        className="hidden"
                      />
                      <div
                        className={`w-10 h-10 rounded-full flex justify-center items-center cursor-pointer ${
                          parseInt(responses[currentQuestion]) === value + 1
                            ? "bg-slate-800 text-white"
                            : "bg-white text-slate-800"
                        } border border-slate-800`}
                      >
                        {value + 1}
                      </div>
                    </label>
                  )
                )}
              </div>
            )}
          </form>

          <div className="mt-20 justify-between flex">
            <button
              className={`p-3 bg-green-600 rounded-full text-white hover:bg-green-700 ${
                currentQuestion === 0 ? "cursor-not-allowed" : ""
              }`}
              onClick={handlePrev}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              className={`p-3 bg-red-600 rounded-full text-white hover:bg-red-700 ${
                currentQuestion === questions.length - 1
                  ? "cursor-not-allowed"
                  : ""
              }`}
              onClick={handleNext}
              disabled={currentQuestion === questions.length - 1}
            >
              Next
            </button>
            {currentQuestion === questions.length - 1 && (
              <button
                className="p-3 bg-blue-600 rounded-full text-white hover:bg-blue-700"
                onClick={handleSubmit}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center mt-20 text-xl text-slate-800">
          <h4>Thank you for your time!</h4>
          <h4>Redirecting to the home page...</h4>
        </div>
      )}
    </div>
  );
}
