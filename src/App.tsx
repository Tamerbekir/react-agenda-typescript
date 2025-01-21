import Todo from "./Pages/Todo";
import Settings from "./Pages/Todo";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </>
  );
}

export default App;
