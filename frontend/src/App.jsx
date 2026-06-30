import React, { useState } from "react";
import questions from "./data/questions.json";
import Results from "./components/Results";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");

  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [showResultsPage, setShowResultsPage] = useState(false);

  const [titleClicks, setTitleClicks] = useState(0);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleTitleClick = () => {
    const newCount = titleClicks + 1;

    if (newCount >= 5) {
      setShowAdminModal(true);
      setTitleClicks(0);
    } else {
      setTitleClicks(newCount);
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "555555") {
      setShowAdminModal(false);
      setAdminPassword("");
      setShowResultsPage(true);
    } else {
      alert("Wrong Password");
      setAdminPassword("");
    }
  };

  function handleNext() {
    if (selectedAnswer === null) {
      alert("Please select an answer");
      return;
    }

    setAnswers([...answers, selectedAnswer]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  }

  function handleSubmit() {
    if (selectedAnswer === null) {
      alert("Please select an answer");
      return;
    }

    let calculatedScore = 0;
    const finalAnswers = [...answers, selectedAnswer];

    finalAnswers.forEach((answer, index) => {
      if (answer === questions[index].correctOption) {
        calculatedScore++;
      }
    });

    setScore(calculatedScore);
    setSubmitting(true);

    fetch("https://online-test-app-sez4.onrender.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        age,
        country,
        score: calculatedScore,
      }),
    })
      .then(async (res) => {
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to submit result");
        }

        return data;
      })
      .then((data) => {
        console.log("Saved:", data);

        setShowResult(true);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  if (showResultsPage) {
    return (
      <Results
        onBack={() => setShowResultsPage(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-zinc-100 via-white to-zinc-200 flex items-center justify-center p-4">

      {/* Admin Modal */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6">

            <h2 className="text-2xl font-bold text-zinc-800 mb-6 text-center">
              Admin Login
            </h2>

            <div className="relative mb-6">
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder=" "
                className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 outline-none focus:border-blue-500"
              />

              <label className="absolute left-0 top-3 text-zinc-500 transition-all duration-200 pointer-events-none peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500 peer-not-placeholder-shown:-top-3 peer-not-placeholder-shown:text-xs">
                Password
              </label>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowAdminModal(false);
                  setAdminPassword("");
                }}
                className="flex-1 py-3 rounded-xl bg-zinc-200 hover:bg-zinc-300 transition"
              >
                Cancel
              </button>

              <button
                onClick={handleAdminLogin}
                className="flex-1 py-3 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                Login
              </button>
            </div>

          </div>
        </div>
      )}

      {showResult ? (
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 text-center">

          <h1 className="text-3xl font-bold text-green-600 mb-4">
            Quiz Completed
          </h1>

          <p className="text-lg text-zinc-700 mb-2">
            Name : {name}
          </p>

          <div className="space-y-2">
            <p className="text-xl font-semibold text-zinc-800">
              Score: {score}/{questions.length}
            </p>

            <p className="text-xl font-semibold text-purple-600">
              Percentage: {((score / questions.length) * 100).toFixed(2)}%
            </p>
          </div>

        </div>
      ) : testStarted ? (
        <div className="bg-white w-full max-w-3xl rounded-3xl shadow-xl p-5 sm:p-8">

          <h1 className="text-2xl sm:text-3xl font-bold text-center text-zinc-800 mb-8">
            Online Test
          </h1>

          <div className="flex justify-between items-center mb-6 text-sm text-zinc-500">
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <span>
              {Math.round(
                ((currentQuestion + 1) / questions.length) * 100
              )}
              %
            </span>
          </div>

          <div className="w-full bg-zinc-200 rounded-full h-2 mb-8">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h2 className="text-lg sm:text-xl font-semibold text-zinc-800 leading-relaxed mb-6">
            Q{questions[currentQuestion].id}.{" "}
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-3">

            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(index)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-200
                  ${selectedAnswer === index
                    ? "bg-blue-500 text-white border-blue-500 shadow-md"
                    : "bg-white border-zinc-200 hover:border-blue-300 hover:bg-zinc-50"
                  }`}
              >
                {option}
              </button>
            ))}

            <div className="pt-3">
              {currentQuestion === questions.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full py-3 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Submitting..." : "Submit Quiz"}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="w-full py-3 rounded-2xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition"
                >
                  Next Question
                </button>
              )}
            </div>

          </div>
        </div>
      ) : (
        <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-6 sm:p-8">

          <h1
            onClick={handleTitleClick}
            className="text-3xl font-bold text-center text-zinc-800 mb-8 cursor-pointer select-none"
          >
            Contestant Details
          </h1>

          {/* Name */}
          <div className="relative mb-7">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 outline-none focus:border-blue-500"
            />

            <label className="absolute left-0 -top-3 text-xs text-zinc-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500">
              Enter Name
            </label>
          </div>

          {/* Roll No */}
          <div className="relative mb-7">
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 outline-none focus:border-blue-500"
            />

            <label className="absolute left-0 -top-3 text-xs text-zinc-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500">
              Enter Age
            </label>
          </div>

          {/* Course */}
          <div className="relative mb-10">
            <input
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              type="text"
              placeholder=" "
              className="peer w-full bg-transparent border-b-2 border-zinc-300 py-3 outline-none focus:border-blue-500"
            />

            <label className="absolute left-0 -top-3 text-xs text-zinc-500 transition-all duration-200 pointer-events-none peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-focus:-top-3 peer-focus:text-xs peer-focus:text-blue-500">
              Country (Optional)
            </label>
          </div>

          <button
            onClick={() => {
              if (!name || !age) {
                alert("Please enter your name and age");
                return;
              }

              setTestStarted(true);
            }}
            className="w-full py-3 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          >
            Start Test
          </button>

        </div>
      )}
    </div>
  );
}

export default App;

