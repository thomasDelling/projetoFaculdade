import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Jogo from "./components/Jogo";
import Admin from "./components/Admin";
import UserManager from "./components/UserManager";
import QuizManager from "./components/QuizManager";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/jogo" element={<Jogo />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/usuarios" element={<UserManager />} />
        <Route path="/admin/perguntas" element={<QuizManager />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
