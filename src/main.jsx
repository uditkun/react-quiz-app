import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer, Results } from "./components";
// import Quiz from "./pages/Quiz";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
const LazyQuiz = lazy(() => import("./pages/Quiz"));

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="2xl:container mx-auto 2xl:overflow-hidden">
        <Router>
          <Navbar />
          <Suspense fallback="Loading...">
            <Routes>
              <Route path="/" element={<App />}></Route>
              <Route path="/quiz" element={<LazyQuiz />}></Route>
              <Route path="/about" element={<About />}></Route>
              <Route path="/faqs" element={<FAQs />}></Route>
              <Route path="/results" element={<Results />}></Route>
            </Routes>
          </Suspense>
          <Footer />
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
