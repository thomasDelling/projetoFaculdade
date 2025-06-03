import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuizMenu from "./pages/QuizMenu";
import QuizPage from "./pages/QuizPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<QuizMenu />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/admin" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
