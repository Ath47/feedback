import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuestionsPage from "./pages/QuestionsPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/QuestionsPage" element={<QuestionsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
