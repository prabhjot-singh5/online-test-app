import React, { useState } from 'react';
import questions from "./data/questions.json";

function App() {

  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [course, setCourse] = useState("");
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers,setAnswers] = useState([]);
  const [score,setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);


  function handleNext(){
    setAnswers([...answers, selectedAnswer]);
    setCurrentQuestion(currentQuestion + 1);
    setSelectedAnswer(null);
  }


  function handleSubmit(){
    let calculatedScore = 0;
    finalAnswers.forEach((answer,index) => {
      if(answer === questions[index].correctOption){
        calculatedScorescore++;
      }
    });

    setScore(calculatedScore);
    setShowResult(true);

    console.log(`Score : ${score} / ${questions.length}`);
    console.log("Quiz Submitted");
    const finalAnswers = [...answers,selectedAnswer];
    console.log(finalAnswers);
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-zinc-100'>
  
        {
  testStarted ? (
    <div className="bg-white p-6 rounded-xl shadow-lg flex-col max-w-120 min-w-120">
      <h1 className='text-zinc-800 flex items-center justify-center text-3xl font-bold mb-6'>Online Test</h1>

      <h2 className='font-semibold text-xl mb-5'>Q{questions[currentQuestion].id}. {questions[currentQuestion].question}</h2>

      <div className='flex flex-col gap-3 mt-4 '>
        {questions[currentQuestion].options.map((option,index) => (
          <button className='border p-3 rounded text-left font-medium' key={index} onClick={() => setSelectedAnswer(index)}>{option}</button>
        ))}
        <p>Selected Answer: {selectedAnswer}</p>


        {
          currentQuestion === questions.length - 1 ?(
            <button onClick={handleSubmit} className='mt-2 p-3 bg-purple-600 text-zinc-100 font-semibold hover:bg-purple-700'>Submit Quiz</button>
          )
          :
          (
            <button onClick={handleNext} className='mt-2 p-3 bg-purple-600 text-zinc-100 font-semibold hover:bg-purple-700'>Next Question</button>
          )
        }
        
        </div>

      </div>
  ) : (
    <div className="bg-white p-6 rounded-xl shadow-lg flex-col max-w-110">
        <h1 className='text-zinc-800 flex items-center justify-center text-3xl font-bold mb-6'>Student Details</h1>

        <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded-md w-full mb-3 border-2 border-zinc-200 outline-none focus:border-blue-500 focus:text-zinc-800' type="text" placeholder='Enter Name' />


        <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} className='p-2 rounded-md w-full mb-3 border-2 border-zinc-200 outline-none focus:border-blue-500 focus:text-zinc-800' type="text" placeholder='Enter Roll No' />

        <input value={course} onChange={(e) => setCourse(e.target.value)} className='p-2 rounded-md w-full mb-6 border-2 border-zinc-200 outline-none focus:border-blue-500 focus:text-zinc-800' type="text" placeholder='Enter Course' />


        <div className='flex items-center justify-center'>
          <button onClick={() => setTestStarted(true)} className='bg-blue-500 hover:bg-blue-600 rounded-md text-white px-3 py-1  text-lg'>Start Test</button>
        </div>
        </div>
  )
}
      
    </div>
  )
}

export default App