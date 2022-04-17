import { Link } from "react-router-dom";
import quizImg from "./quiz-img.jpg";
import { useQueryClient } from "react-query";

function App() {
  const queryClient = useQueryClient();
  return (
    <>
      <div className=" flex flex-col justify-center content-around sm:flex-row sm:justify-around sm:items-center p-4 h-[calc(100vh_-_85px)]">
        <div>
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-4xl font-bold text-gray-800">
              Welcome to Quiz App
            </h2>
            <p className="w-3/5">
              Generate tests based on available quiz categories. Enjoy the quiz
              and learn on the way.
            </p>
          </div>
          <Link to="/quiz">
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white cursor-pointer rounded"
              onClick={
                queryClient.getQueryData("questions") &&
                queryClient.invalidateQueries("questions")
              }
            >
              Start Quiz
            </button>
          </Link>
        </div>
        <img
          className="hidden max-w-sm md:block lg:max-w-md"
          src={quizImg}
          alt="quiz img"
        />
      </div>
    </>
  );
}

export default App;
