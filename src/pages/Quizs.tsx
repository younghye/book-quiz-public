import { useNavigate, useLocation } from "react-router-dom";
import { CharacterImages } from "../components/data";
import { useState } from "react";
import { randomNumber } from "../components/utils";
import Home from "./Home";
import Confetti from "react-confetti";

interface Progress {
  width: number;
  color: string;
}
const Quizs = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [index, setIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isPassed, setIsPassed] = useState<boolean>(false);
  const [progressBar, setProgressBar] = useState<Progress[]>([]);
  const [image] = useState<string>(
    CharacterImages[randomNumber(0, CharacterImages.length - 1)]
  );

  if (!location.state) return <Home />;

  const { quizs } = location.state;

  const handleNext = () => {
    if (!selectedOption) {
      setMessage("Please select answer!");
    } else {
      setMessage("");
      if (selectedOption === quizs[index].answer) {
        setBrightness(brightness + 10);
        setScore((prev) => prev + 1);
        setProgressBar([...progressBar, { width: 10, color: "blue" }]);
      } else {
        setProgressBar([...progressBar, { width: 10, color: "red" }]);
      }

      if (index >= quizs.length - 1) {
        setIsCompleted(true);
        setIsPassed(() => (score >= 8 ? true : false));
      } else {
        setIndex(index + 1);
      }
      setSelectedOption("");
    }
  };

  return (
    <div className="flex items-center justify-center grid grid-cols-1 md:grid-cols-2 md:gap-4 pt-10 m-10 md:m-20">
      <div>
        <img
          style={{
            width: "70%",
            maxHeight: "100%",
            filter: `brightness(${brightness}%)`,
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
          alt={image}
          src={process.env.PUBLIC_URL + `/assets/images/characters/${image}`}
        />
      </div>

      <div>
        {isCompleted ? (
          <div className="text-center md:text-left">
            {isPassed && <Confetti />}
            <div className="mt-10 text-3xl md:text-5xl font-extrabold">
              <p className="mb-10">
                Your Score {score}/{quizs.length}
              </p>
              <p>
                {isPassed
                  ? "Well done you passed!"
                  : "Read the book again and try"}
              </p>
            </div>
            <button
              type="button"
              className="w-18px mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() =>
                isPassed
                  ? navigate("/video", {
                      state: {
                        score: score,
                      },
                    })
                  : navigate("/home")
              }
            >
              {isPassed ? "Whatch Video" : "Back to Home"}
            </button>
          </div>
        ) : (
          <div className="md:me-10">
            <div className="mb-5 md:mb-10">
              {message && (
                <span className="text-lg text-red-600">
                  <strong>{message}</strong>
                </span>
              )}

              <div className="mb-2 flex justify-between items-center">
                <span />
                <span className="text-sm text-gray-800 dark:text-white">
                  {index}/{quizs.length}
                </span>
              </div>
              <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700">
                {progressBar &&
                  progressBar.map((process: Progress) => (
                    <div
                      className="flex flex-col justify-center rounded-full overflow-hidden transition duration-500 dark:bg-blue-500"
                      style={{
                        width: `${process.width}%`,
                        backgroundColor: process.color,
                      }}
                    ></div>
                  ))}
              </div>
            </div>
            <div>
              <p className="font-bold text-xl md:text-3xl mb-5 md:mb-8">
                {quizs[index].question}
              </p>
              <ul className="flex flex-col gap-3.5">
                {quizs[index].options &&
                  quizs[index].options.map(
                    (option: string, optionIndex: number) => (
                      <li
                        key={optionIndex}
                        className="w-full border-2 p-2 md:p-3 rounded-md text-lg md:text-xl"
                        style={{
                          backgroundColor:
                            selectedOption === option ? "limegreen" : "",
                        }}
                        onClick={() => setSelectedOption(option)}
                      >
                        {option}
                      </li>
                    )
                  )}
                <button
                  type="button"
                  className="w-full mt-4 md:mt-8 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleNext}
                >
                  Next
                </button>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Quizs;
