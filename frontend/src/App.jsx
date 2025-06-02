import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizMenu from "./pages/QuizMenu";
import QuizPage from "./pages/QuizPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/menu" element={<QuizMenu />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/admin" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
