"use client";

import { useState } from "react";
import Image from "next/image";
import QuizModal from "./components/quiz.modal"; // Adjust the path according to your folder structure
import Logo from "../../public/assets/bicto-logo.png"; // Path from public folder
import PGBhLogo from "../../public/assets/logo.png";
import Capitol from "../../public/assets/CAPITOL.jpg"; // Path from public folder

export default function Home() {
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <div className="relative grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 bg-transparent">
        <div className="flex items-center gap-4">
          <Image src={PGBhLogo} alt="PGBh Logo" width={60} height={60} />
          <span className="text-white text-lg sm:text-xl lg:text-2xl font-semibold">
            PGBh Quiz Bee
          </span>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <a
            href="#"
            className="text-white text-base hover:text-blue-300"
            onClick={() => setShowAboutModal(true)}
          >
            About
          </a>
        </div>
      </nav>

      <div className="absolute inset-0">
        {/* Background image with gradient overlay */}
        <Image
          src={Capitol}
          alt="Capitol Building"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-400 to-transparent opacity-80 z-0" />
      </div>

      {/* Wave SVG at the bottom */}
			<div className="absolute bottom-0 left-0 right-0 z-0">
				<svg
					viewBox="0 0 1440 320"
					xmlns="http://www.w3.org/2000/svg"
					className="w-full h-auto"
				>
					<path
						fill="#ffffff" /* Bottom part color */
						fillOpacity="0.8" /* Adjust opacity */
						d="M0,192L60,192C120,192,240,192,360,181.3C480,171,600,149,720,138.7C840,128,960,128,1080,149.3C1200,171,1320,213,1380,234.7L1440,256L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
					/>
				</svg>
			</div>

      <div className="relative z-10 flex flex-col gap-8 row-start-2 justify-center items-center">
        {/* Hero Text */}
        <h1 className="text-white text-6xl font-bold text-center sm:text-left">
          Join the Ultimate Quiz Challenge!
        </h1>

        {/* Start Quiz Button */}
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <button
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-500 text-white gap-2 hover:bg-blue-600 text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            onClick={() => setShowQuizModal(true)}
          >
            Start Quiz
          </button>
        </div>

        {showQuizModal && <QuizModal setShowModal={setShowQuizModal} />}
        {showAboutModal && <QuizModal setShowModal={setShowAboutModal} isAbout />}
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 left-0 right-0 z-10 flex gap-8 items-center justify-center bg-transparent py-4">
        <Image src={Logo} alt="BICTO Logo" width={50} height={50} />
        <span className="text-gray-500 text-sm sm:text-base">
          Developed and Maintained by BICTO
        </span>
      </footer>
    </div>
  );
}
