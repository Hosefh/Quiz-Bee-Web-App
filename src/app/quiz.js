'use client';

import { useState } from 'react';

const Quiz = () => {
  const [score, setScore] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);

  const questions = [
    { question: "What is 2 + 2?", options: [2, 3, 4, 5], correct: 2 },
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], correct: 2 },
    // Add more questions here
  ];

  const handleAnswer = (index) => {
    if (index === questions[questionIndex].correct) {
      setScore(score + 1);
    }
    setQuestionIndex(questionIndex + 1);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-xl bg-blue-100 rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Question {questionIndex + 1}</h2>
          <span className="bg-green-500 text-white px-4 py-1 rounded-full">Score: {score}</span>
        </div>
        <p className="text-lg mb-4">{questions[questionIndex]?.question}</p>
        <div className="grid grid-cols-1 gap-4">
          {questions[questionIndex]?.options.map((option, index) => (
            <button
              key={index}
              className="bg-blue-500 text-white py-2 px-4 rounded-full shadow-md"
              onClick={() => handleAnswer(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
