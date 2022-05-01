import { useEffect, useState } from "react";
import Error404 from "./Error404";
import { getCategories } from "./AsyncRequests";
import { useQueryClient } from "react-query";

function Categories({ changePage, getFullData }) {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    category: "",
    difficulty: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    getFullData(formData);
    // console.log("Form Submitted");
    changePage();
  };

  const onChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const { isLoading, data, error } = getCategories();

  if (isLoading) return "Loading...";
  if (error) return <Error404 />;

  return (
    <div className="h-[calc(100vh_-_116px)] w-3/4 mx-auto mt-8">
      <h3 className="text-xl font-bold">Quiz Setup</h3>
      <form onSubmit={(e) => onSubmit(e)}>
        <div className="mt-4">
          <label className="mr-4" htmlFor="category">
            Category
          </label>
          <select
            className="border rounded text-sm w-2/4"
            name="category"
            id="category"
            onChange={(e) => onChange(e)}
          >
            <option id={1} value="">
              Any
            </option>
            {data?.trivia_categories?.map((elem) => {
              return (
                <option key={elem.id} id={elem.id} value={elem.name}>
                  {elem.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mt-4">
          <label className="mr-4" htmlFor="difficuly">
            Difficulty
          </label>
          <select
            className="border rounded text-sm w-2/4"
            name="difficulty"
            id="difficulty"
            placeholder="Select"
            onChange={(e) => onChange(e)}
          >
            <option value="">Any</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600"
          onClick={() => {
            queryClient.getQueryData("questions") &&
              queryClient.invalidateQueries("questions");
          }}
        >
          Start Quiz
        </button>
      </form>
    </div>
  );
}

export default Categories;
