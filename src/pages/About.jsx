function About() {
  return (
    <div className="container pl-8 pr-2 text-lg mb-8">
      <h1 className="text-3xl my-8">About</h1>
      <p className="mb-4">
        This app is built using React, Vite, React Router, Tailwind CSS, React
        Query, OpenDBTrivia API
      </p>
      <p className="underline pb-2">Features:-</p>
      <ol>
        <li>
          1) Generate Quiz from over 24 categories available in OpenDBTrivia.
        </li>
        <li>2) Select quiz type and difficulty as per your choice.</li>
        <li>3) Answer as many questions as you like.</li>
        <li>
          4) Review your answers at the time of taking quiz using Previous and
          Next buttons.
        </li>
        <li>5) Check your scores based on attempted questions.</li>
        <li>6) Have fun while learning.</li>
      </ol>
    </div>
  );
}

export default About;
