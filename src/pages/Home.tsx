import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { chatGroq, QuizArray } from "../components/chatGroq";
import { useState } from "react";
import { useThrowAsyncError } from "../components/useThrowAsyncError";
import Loading from "./Loading";

type FormValues = {
  title: string;
  author: string;
};

const Home = () => {
  const navigate = useNavigate();
  const throwError = useThrowAsyncError();
  const { register, handleSubmit } = useForm<FormValues>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (!data.author || !data.title) {
      setMessage("Title and Author are required.");
      return;
    }

    try {
      setIsLoading(true);
      const response: QuizArray = await chatGroq(data.title, data.author);
      setIsLoading(false);

      if (
        response?.quizs?.length > 0 &&
        response.quizs[response.quizs.length - 1].isExist
      ) {
        navigate("/quizs", {
          state: {
            quizs: response.quizs,
          },
        });
      } else {
        setMessage("Couldn't find information of the book");
      }
    } catch (error) {
      throwError(error);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <div
          className="bg-cover bg-no-repeat bg-center h-[100vh]"
          style={{
            // backgroundSize: "100% 100%",
            backgroundImage: `url(${
              process.env.PUBLIC_URL + "/assets/images/background.jpg"
            })`,
          }}
        ></div>

        <div className="absolute top-[40vh] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[70vw] md:w-[50vw] lg:w-[30vw]">
          <div className="text-3xl md:text-4xl lg:text-6xl font-bold">
            BOOK QUIZ
          </div>
          {message && (
            <p className="text-red-600 text-xl mt-3">
              <strong>{message}</strong>
            </p>
          )}
          <div className="text-left mt-7 text-xl">
            <div>
              <label>Book Title</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Book Title"
                {...register("title")}
              />
            </div>
            <div className="mt-8">
              <label>Author</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="author"
                type="text"
                placeholder="Author"
                {...register("author")}
              />
            </div>
            <button
              type="submit"
              className="w-full mt-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Quiz
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default Home;
