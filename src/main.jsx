import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer, Results } from "./components";
import Quiz from "./pages/Quiz";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <div className="2xl:container mx-auto 2xl:overflow-hidden">
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/quiz" element={<Quiz />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/faqs" element={<FAQs />}></Route>
            <Route path="/results" element={<Results />}></Route>
          </Routes>
          <Footer />
        </Router>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
