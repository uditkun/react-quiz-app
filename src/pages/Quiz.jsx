import { useState } from "react";
import { Categories, QuestionSection, Results, Error404 } from "../components";

function Quiz() {
  const [pageOrder, setPageOrder] = useState(1);
  const [data, setData] = useState([]);

  const getFullData = (data) => {
    setData((prevData) => [
      ...prevData,
      {
        ...data,
      },
    ]);
  };

  const changePageOrder = () => {
    setPageOrder((pageOrder) => pageOrder + 1);
  };

  // useEffect(() => {
  //   if (localStorage.getItem("data") != null) {
  //     setData(JSON.parse(localStorage.getItem("data")));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  switch (pageOrder) {
    case 1: {
      return (
        <Categories changePage={changePageOrder} getFullData={getFullData} />
      );
    }
    case 2: {
      return (
        <QuestionSection
          changePage={changePageOrder}
          data={{ data, getFullData }}
        />
      );
    }
    case 3: {
      return <Results data={{ data, setData }} />;
    }
    default:
      return <Error404 />;
  }
}

export default Quiz;
