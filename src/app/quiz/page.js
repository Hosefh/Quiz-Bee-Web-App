"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PGBhLogo from "../../../public/assets/logo.png";

const quizData = [
	{
		category: "GENERAL INFORMATION",
		question:
			"Internationally famed for its Children’s Choir, the municipality of Loboc features a musical symbol on its municipal flag? What is this featured symbol?",
		answers: ["F Clef", "G Clef", "Quarter Note", "Rest Note"],
		correct: 1, // Index of correct answer (B. G Clef)
		source:
			"https://ppdo.bohol.gov.ph/profile/bohol-facts-and-figures/provincial-symbols/",
	},
	{
		category: "TOURISM LANDMARKS",
		question:
			"Built during the Spanish Colonial Era to detect Moro raiders and pirates, the watchtowers in Bohol have been recognized under the RA 10066 otherwise known as the National Heritage Act of 2009, of the many watchtowers in the province, how many are declared as National Cultural Treasures?",
		answers: ["2", "5", "6", "7"],
		correct: 2, // Index of correct answer (C. 6)
		source:
			"https://boholislandnews.com/2024/05/25/pamilacan-watchtower-declared-as-national-cultural-treasure/",
	},
	{
		category: "GENERAL INFORMATION",
		question:
			"A swing bridge was constructed above the Loboc River in the town of Loay. It was the only one of its kind in the Visayas and one of the few revolving bridges in the nation during its time. The original Clarin Bridge in Loay was inaugurated on what exact date?",
		answers: ["June 9, 1914", "June 10, 1914", "June 9, 1915", "June 10, 1915"],
		correct: 0, // Index of correct answer (A. June 9, 1914)
		source: "https://quod.lib.umich.edu/p/philamer/",
	},
	{
		category: "GENERAL INFORMATION",
		question:
			"With only a short term lasting only from May 22, 1897 to December 20, 1898, he, with the rank of Lieutenant Colonel, was assigned to be the Governor of Bohol. Who is the LAST SPANISH Governor of Bohol?",
		answers: [
			"Carlos Polestico Garcia",
			"Bernabe Fortich Reyes",
			"Eduardo Moreno Esteller",
			"Guillermo Kirkpatrick",
		],
		correct: 2, // Index of correct answer (C. Eduardo Moreno Esteller)
		source:
			"Isla de Bohol. Guía oficial de las Islas Filipinas para 1898. p. 817.",
	},
	{
		category: "GENERAL INFORMATION",
		question:
			"Raised in Duero, Bohol and known as 'the Father of Modern Philippine Sculpture', he is a renowned National Artist and the youngest to have ever received the title. He created the Blood Compact Monument displayed in his home province. Who is this National Artist?",
		answers: [
			"Alejandro Reyes Roces",
			"Antonio Ramirez Buenaventura",
			"Fernando Cueto Amorsolo",
			"Napoleon Veloso Abueva",
		],
		correct: 3, // Index of correct answer (D. Napoleon Veloso Abueva)
		source:
			"https://www.nationalmuseum.gov.ph/2022/01/26/birth-anniversary-of-napoleon-abueva/",
	},
	{
		category: "TOURISM LANDMARKS",
		question:
			"The Church of Immaculada Conception in Baclayon is considered to be one of the oldest churches in the Philippines and was remarkably constructed by some 200 native forced laborers. They built the church from coral stones, cut into square blocks and piled on to each other using the white of a million eggs to cement them together. What did the native laborers use to move and lift the stones in position?",
		answers: ["Coconut", "Molave", "Bamboo", "Wild Vine"],
		correct: 2, // Index of correct answer (C. Bamboo)
		source:
			"Labayos, J. D. The History and Their Folk Stories of 48 Bohol Towns.",
	},
	{
		category: "GENERAL INFORMATION",
		question:
			"The official Bohol flag was approved per Provincial Board Resolution NO. 238 on 28 October 1969 and Resolution No. 121, series of 1971. Its main colors are blue, red, and white. What does blue signify?",
		answers: ["Nobility", "Purity", "Peacefulness", "Courage"],
		correct: 0, // Index of correct answer (A. Nobility)
		source:
			"https://ppdo.bohol.gov.ph/profile/bohol-facts-and-figures/provincial-symbols/",
	},
	{
		category: "TOURISM LANDMARKS",
		question:
			"In 2010, submerged beneath the seas off Bien Unido were two statues, the Blessed Virgin Mary and Sr. Sto. Niño, to discourage fishermen from destroying the reef plagued with dynamite fishing. How many feet underwater is the statue of Santo Niño situated?",
		answers: ["30ft", "40ft", "60ft", "80ft"],
		correct: 0, // Index of correct answer (A. 30ft)
		source:
			"Labayos, J. D. The History and Their Folk Stories of 48 Bohol Towns. p. 23.",
	},
	{
		category: "GENERAL INFORMATION",
		question:
			"Bohol Hymn has been interpreted as being a strong statement of Boholanos' commitment to their culture, history and environment. Who translated the original English lyrics of Bohol Hymn into Binisaya (Awit sa Bohol)?",
		answers: [
			"Julian Felipe",
			"Justino Romea",
			"Maxelende Ganade",
			"Lucresia Kasilag",
		],
		correct: 2, // Index of correct answer (C. Maxelende Ganade)
		source:
			"https://boholislandnews.com/2020/10/12/maxelende-ganade-influential-lyricist-and-composer-dies-at-82/",
	},
	{
		category: "TOURISM LANDMARKS",
		question:
			"The National Museum of the Philippines – Bohol is the former Provincial Capitol building, constructed in 1855 to 1860 to serve as a tribunal, prison and military quarters for the Spanish military force. Who among these gobernadorcillo helped pay for the construction of the building that was completed in 1860?",
		answers: [
			"Esteban Butalid",
			"Don Leon Torralba",
			"Guillermo Kirkpatrick",
			"Jacinto Remolador",
		],
		correct: 0, // Index of correct answer (A. Esteban Butalid)
		source:
			"https://www.nationalmuseum.gov.ph/our-museums/regional-area-and-site-museums/bohol/",
	},
];

export default function Quiz() {
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [countdown, setCountdown] = useState(120); // Time left for current question
	const [modalCountdown, setModalCountdown] = useState(5); // Time left for modal
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [sliderValue, setSliderValue] = useState(120); // Start at 120 seconds

	const router = useRouter();

	// Countdown for the question timer
	useEffect(() => {
		if (countdown > 0) {
			const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
			return () => clearTimeout(timer);
		} else {
			handleAnswerTimeout();
		}
	}, [countdown]);

	// Countdown for the modal before moving to the next question
	useEffect(() => {
		if (showModal && modalCountdown > 0) {
			const modalTimer = setTimeout(
				() => setModalCountdown(modalCountdown - 1),
				1000
			);
			return () => clearTimeout(modalTimer);
		} else if (modalCountdown === 0) {
			moveToNextQuestion();
		}
	}, [showModal, modalCountdown]);

	const handleAnswerClick = (index) => {
		setSelectedAnswer(index);
		if (index === quizData[currentQuestion].correct) {
			setScore(score + 1);
		}
		// Show the modal after clicking Next button
		if (currentQuestion < quizData.length - 1) {
			setShowModal(true);
		} else {
			moveToNextQuestion();
		}
	};

	const handleAnswerTimeout = () => {
		setSelectedAnswer(null); // Mark as timeout (no answer selected)
		if (currentQuestion < quizData.length - 1) {
			setShowModal(true);
		} else {
			moveToNextQuestion();
		}
	};

	const moveToNextQuestion = () => {
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < quizData.length) {
			setCurrentQuestion(nextQuestion);
			setCountdown(120); // Reset countdown to 2 minutes
			setSelectedAnswer(null);
			setShowModal(false);
			setModalCountdown(5);
		} else {
			setShowResult(true);
		}
	};

	const resetQuiz = () => {
		setCurrentQuestion(0);
		setScore(0);
		setShowResult(false);
		setCountdown(120);
		setSelectedAnswer(null);
		setModalCountdown(5);
	};

	const handleLeave = () => {
		router.push("/");
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
	};

	const handleSliderChange = (e) => {
		setSliderValue(e.target.value);
		setCountdown(e.target.value);
	};

	const formatSliderValue = (value) => {
		const minutes = Math.floor(value / 60);
		const seconds = value % 60;
		if (minutes > 0) {
			return `${minutes} min ${seconds > 0 ? `${seconds} sec` : ""}`;
		}
		return `${seconds} sec`;
	};

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
			<nav className="absolute top-0 left-0 right-0 z-20 flex justify-between items-center p-6 bg-transparent">
				<div className="flex items-center gap-4">
					<Image src={PGBhLogo} alt="PGBh Logo" width={60} height={60} />
					<span className="text-white text-lg sm:text-xl lg:text-2xl font-semibold">
						PGBh Quiz Bee
					</span>
				</div>

				{/* Right Side: Home and Menu */}
				<div className="ml-auto flex items-center gap-6">
					<button
						onClick={handleLeave}
						className="text-white text-base hover:text-blue-300 bg-transparent border-none cursor-pointer"
					>
						Home
					</button>

					<div className="relative">
						<button
							onClick={toggleDropdown}
							className="text-white text-base hover:text-blue-300 bg-transparent border-none cursor-pointer"
						>
							Timer Settings
						</button>

						{isDropdownOpen && (
							<div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-4 px-4 z-10">
								<span className="block text-gray-800 font-semibold mb-2">
									Select Time:
								</span>
								<input
									type="range"
									min="30"
									max="300"
									value={sliderValue}
									onChange={handleSliderChange}
									className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
								/>
								<div className="text-center mt-2 text-gray-800">
									{formatSliderValue(sliderValue)}
								</div>
							</div>
						)}
					</div>
				</div>
			</nav>

			{showResult ? (
				<div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
					<h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
					{/* <p className="text-lg">Your score: {score}</p> */}
					<button
						onClick={resetQuiz}
						className="mt-4 px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700"
					>
						Restart Quiz
					</button>
				</div>
			) : (
				<div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg w-full max-w-4xl">
					<h2 className="text-xl font-semibold mb-4 flex justify-between">
						<span>{quizData[currentQuestion].category}</span>
						<span>Question {currentQuestion + 1}</span>
					</h2>
					<p className="mb-8">{quizData[currentQuestion].question}</p>
					<div className="mb-4">
						{quizData[currentQuestion].answers.map((answer, index) => (
							<button
								key={index}
								className={`block w-full p-2 mb-2 text-left rounded-lg ${
									selectedAnswer === index
										? "bg-blue-300 text-white"
										: "bg-gray-100 text-black"
								}`}
								disabled // Removed onClick, as requested
							>
								{answer}
							</button>
						))}
					</div>
					<button
						onClick={() => handleAnswerClick(selectedAnswer)}
						className="w-full px-8 py-4 bg-blue-500 text-white text-xl font-bold rounded-lg hover:bg-blue-700"
					>
						Next
					</button>
					<p className="text-gray-700 mb-4 mt-8 text-center text-xl font-extrabold">
						Time Left: {countdown} seconds
					</p>
				</div>
			)}

			<div className="absolute bottom-0 items-center justify-center">
				<p>Developed by BICTO with ❤️</p>
			</div>

			{/* Modal for showing the correct answer */}
			{showModal && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
						<h2 className="text-2xl font-bold mb-4 text-gray-500">
							Correct Answer
						</h2>
						<p className="text-2xl mb-4 text-gray-500">
							The correct answer is:{" "}
							<span className="font-extrabold text-green-600">
								{
									quizData[currentQuestion].answers[
										quizData[currentQuestion].correct
									]
								}
							</span>
						</p>
						<p className="text-base mb-4 mt-8 text-gray-500">
							Moving to the next question in {modalCountdown} seconds...
						</p>
					</div>
				</div>
			)}
		</div>
	);
}
