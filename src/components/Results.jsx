import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";

function Results({ data }) {
  const queryClient = useQueryClient();
  const [viewAnswers, setViewAnswers] = useState(false);
  const { questionsData, resultsArray, options } = data.data[1];

  const navigate = useNavigate();

  const score = () => {
    let scoresArray = resultsArray?.filter(
      (elem) =>
        questionsData?.results[elem?.count - 1]?.correct_answer ===
        elem?.userAnswer
    );
    return scoresArray.length;
  };

  const retouch = (element) => {
    return element
      .replace(/(&quot\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, "&");
  };

  return (
    <div className="container min-h-[calc(100vh_-_116px)] mx-auto mt-8 py-4 px-10">
      <div className="text-center">
        <h3 className="text-3xl font-bold">Results</h3>
        <div className="my-4">
          <p className="text-base">Topic: topic</p>
          <p className="text-base">difficulty: difficulty</p>
        </div>
        <p className="text-lg font-bold">
          Score: <span className="text-green-400">{score()}</span>
        </p>
        <div className="flex gap-4 justify-between items-center mt-4 sm:w-[500px] mx-auto">
          <button
            className="px-4 py-2 bg-blue-500 font-semibold rounded-md text-white hover:bg-blue-700"
            onClick={() => setViewAnswers(!viewAnswers)}
            disabled={!resultsArray.length}
          >
            {viewAnswers ? "Hide Answers" : "View Answers"}
          </button>
          <button
            className="bg-green-500 px-4 py-2 font-semibold rounded-md text-white hover:bg-green-700"
            onClick={() => {
              navigate("/");
              queryClient.invalidateQueries("questions");
              data.setData((data) => []);
            }}
          >
            Take another Quiz
          </button>
        </div>
        {viewAnswers &&
          resultsArray.map((elem, index) => {
            return (
              <div
                key={index}
                className="container mx-auto mt-5 mb-6 p-4 rounded-md bg-slate-200 sm:w-[500px]"
              >
                <p className="text-left mb-3">
                  <span
                    className={`${
                      questionsData?.results[elem?.count - 1]
                        ?.correct_answer === elem?.userAnswer
                        ? "text-green-500 font-bold"
                        : "text-red-500 font-bold"
                    }`}
                  >
                    {elem?.count + ")"}{" "}
                  </span>
                  {retouch(questionsData?.results[elem?.count - 1]?.question)}
                </p>
                <ul>
                  {options[elem?.count - 1]?.map((element) => {
                    let correctAnswer =
                      questionsData?.results[elem?.count - 1]?.correct_answer;
                    return (
                      <li
                        key={element}
                        className={`${
                          correctAnswer === element
                            ? "bg-green-500 text-white"
                            : elem.userAnswer === element
                            ? "bg-orange-500"
                            : "bg-slate-100 text-gray-600"
                        } py-2 px-3 mb-2 text-left rounded-md font-semibold`}
                      >
                        {retouch(element)}
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Results;
