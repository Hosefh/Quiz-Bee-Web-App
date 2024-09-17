import { useState } from 'react';
import QuizModal from './quiz.modal';

const LandingPage = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="h-screen flex items-center justify-center bg-blue-100">
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded-full shadow-lg text-lg"
        onClick={() => setShowModal(true)}
      >
        Start Quiz
      </button>
      {showModal && <QuizModal setShowModal={setShowModal} />}
    </div>
  );
};

export default LandingPage;
