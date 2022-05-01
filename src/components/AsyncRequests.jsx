import { useQuery } from "react-query";

export function getCategories() {
  const fetchCategories = async () => {
    const categories = await fetch("https://opentdb.com/api_category.php");
    const data = await categories.json();
    // console.log(data);
    return data;
  };

  return useQuery("categories", fetchCategories, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
}

export const getQuestions = (argument) => {
  const { category, difficulty } = argument;
  const { data: userCategoryData } = getCategories();
  // console.log(userCategoryData);
  const id =
    category === ""
      ? ""
      : userCategoryData?.trivia_categories.find(
          (elem) => elem.name == category
        )?.id;

  const fetchQuestions = async () => {
    // console.log(id, difficulty);
    const questions = await fetch(
      `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`
    );
    // console.log(
    //   `https://opentdb.com/api.php?amount=10&category=${id}&difficulty=${difficulty}`
    // );
    const questionsData = await questions.json();
    // console.log(questionsData);
    return questionsData;
  };

  return useQuery("questions", fetchQuestions, {
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });
};

export default { getCategories, getQuestions };
