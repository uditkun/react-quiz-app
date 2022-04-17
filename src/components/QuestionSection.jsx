import { useEffect, useState } from "react";
import { getQuestions } from "./AsyncRequests";
import Error404 from "./Error404";

function QuestionSection({ changePage, data }) {
  const [count, setCount] = useState(0);
  const [options, setOptions] = useState([]);
  const [userAnswer, setUserAnswer] = useState([]);

  const {
    data: questionsData,
    isLoading,
    isError,
    isFetching,
  } = getQuestions(data.data[0]);

  const filterQuestions = () => {
    const newOptions = questionsData?.results?.map((elem) => {
      return [elem.correct_answer, ...elem.incorrect_answers].sort(
        () => 1 - Math.random() * 2
      );
    });
    newOptions && setOptions((options) => [...newOptions]);
  };

  useEffect(() => {
    filterQuestions();
  }, [questionsData]);

  const getUserOption = (e) => {
    // console.log(e.target.innerText);
    const userOption = { count: count + 1, userAnswer: e.target.innerText };
    setUserAnswer((userAnswer) => [...userAnswer, userOption]);
  };

  const retouch = (element) => {
    return element
      .replace(/(&quot\;)/g, '"')
      .replace(/(&#039\;)/g, "'")
      .replace(/(&amp\;)/g, "&");
  };

  const makeResult = () => {
    let i = 1;
    let resultsArray = userAnswer
      .reverse()
      .map(() => {
        let answer = userAnswer.find((elem) => elem.count === i);
        i++;
        return answer;
      })
      .filter((elem) => elem !== undefined);
    data.getFullData({
      questionsData,
      resultsArray,
      options,
    });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Please Wait...</div>;
  }

  if (isError) {
    return <Error404 />;
  }

  return (
    <div className="container mx-auto w-[90%] sm:w-4/5 mt-8 h-[calc(100vh_-_118px)] p-4">
      <div className="flex items-start gap-4 my-4 py-2 px-4">
        <p className="text-lg font-bold">
          Topic:{" "}
          <span className="font-medium text-lg">
            {questionsData?.results[count]?.category}
          </span>
        </p>

        <span
          className={`py-1 px-3 mt-1 ${
            questionsData?.results[count]?.difficulty == "easy"
              ? "bg-green-600"
              : questionsData?.results[count]?.difficulty == "medium"
              ? "bg-orange-400"
              : "bg-red-500"
          } text-xs font-bold text-white rounded-sm align-middle capitalize`}
        >
          {questionsData?.results[count]?.difficulty}
        </span>
      </div>
      <p className="mb-5">
        {`${count + 1}) ` + retouch(questionsData?.results[count]?.question)}
      </p>
      <ul>
        {/* {console.log(options)} */}
        {options &&
          options[count]?.map((elem, index) => {
            return (
              <li
                className={`p-2 ml-3 w-full sm:w-3/4 lg:w-1/3 mb-4 border-2 rounded cursor-pointer
                  ${
                    userAnswer?.[userAnswer.length - 1]?.userAnswer === elem &&
                    "bg-green-500 text-white"
                  }`}
                key={count + index}
                onClick={(e) => getUserOption(e)}
              >
                {retouch(elem)}
              </li>
            );
          })}
      </ul>

      <div className="flex justify-between items-center p-3">
        <div className="flex gap-4">
          <button
            className={`px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-700 ${
              count <= 0 && "hidden"
            }`}
            onClick={() => setCount((count) => count - 1)}
          >
            Prev
          </button>
          <button
            className={`px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-700 ${
              count >= 9 && "hidden"
            }`}
            onClick={() => setCount((count) => count + 1)}
          >
            Next
          </button>
        </div>
        {count >= 9 && (
          <button
            className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={() => {
              if (confirm("Are you sure?")) {
                makeResult();
                changePage();
              }
              return;
            }}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionSection;
