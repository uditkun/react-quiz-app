import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="flex px-5 py-2 justify-between items-center bg-blue-500">
      <div className="text-2xl text-white font-bold">Quiz App</div>
      <ul className="flex justify-end items-center">
        <li className="py-1 px-2 gap-1 hover:bg-blue-700 cursor-pointer rounded text-white">
          <Link to="/">Home</Link>
        </li>
        <li className="py-1 px-2 gap-1 hover:bg-blue-700 cursor-pointer rounded text-white">
          <Link to="/about">About</Link>
        </li>
        <li className="py-1 px-2 gap-1 hover:bg-blue-700 cursor-pointer rounded text-white">
          <Link to="/faqs">FAQs</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
