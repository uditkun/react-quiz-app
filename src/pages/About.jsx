function About() {
  return (
    <div className="container pl-8 pr-2 text-lg mb-8">
      <h1 className="text-3xl my-8">About</h1>
      <p className="mb-4">
        This app is built using React, Vite, React Router, Tailwind CSS, React
        Query, OpenDBTrivia API
      </p>
      <p className="underline pb-2">Features:-</p>
      <ol className="list-decimal">
        <li>
          Generate Quiz from over 24 categories available in OpenDBTrivia.
        </li>
        <li>Select quiz type and difficulty as per your choice.</li>
        <li>Answer as many questions as you like.</li>
        <li>
          Review your answers at the time of taking quiz using Previous and Next
          buttons.
        </li>
        <li>Check your scores based on attempted questions.</li>
        <li>Have fun while learning.</li>
      </ol>

      <div className="py-4">
        <p className="text-xs">
          Note:- This app is just for demo, it currently lacks some features
          like caching.
        </p>
      </div>
    </div>
  );
}

export default About;
