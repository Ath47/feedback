import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <form className="text-center text-xl mt-20 text-slate-800 p-2">
      <h1 className="font-bold text-3xl">Customer Survey</h1>
      <h4 className="mb-10">
        Please click on the start button to begin the Survey.
      </h4>

      <Link to="/QuestionsPage">
        <button className="bg-slate-800 text-slate-200 p-2 rounded-lg hover:bg-slate-700">
          Start
        </button>
      </Link>
    </form>
  );
}

export default Header;
