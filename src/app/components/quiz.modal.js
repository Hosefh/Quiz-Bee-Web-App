'use client';

import { useRouter } from 'next/navigation';

const QuizModal = ({ setShowModal, isAbout }) => {
  const router = useRouter();

  const startQuiz = () => {
    setShowModal(false);
    router.push('/quiz');  // Navigate to the quiz page
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md mx-auto">
        <button
          className="text-gray-500 hover:text-gray-700 float-right"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        
        {/* Conditional content based on isAbout */}
        {!isAbout ? (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-400">Quiz Overview</h2>
            <p className="text-gray-600 mb-6">
              You will answer a series of questions. Choose the correct option to earn points.
            </p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-md"
              onClick={startQuiz}
            >
              Let's Go!
            </button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-gray-400">About Quiz Bee</h2>
            <p className="text-gray-600 mb-6">
              The PGBh Quiz Bee is a knowledge competition designed to challenge participants on various topics.
              Join us and test your knowledge!
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizModal;
