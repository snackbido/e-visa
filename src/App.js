import "./App.css";
import { ApplyVisa } from "./page/apply-visa";
import Home from "./page/home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/apply-visa" element={<ApplyVisa />} />
    </Routes>
  );
}

export default App;
