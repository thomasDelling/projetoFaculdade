import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import QuizMenu from "./pages/QuizMenu";
import QuizPage from "./pages/QuizPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota raiz redireciona para login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Rotas públicas */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Rotas protegidas (você pode adicionar autenticação depois) */}
        <Route path="/menu" element={<QuizMenu />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/admin" element={<HomePage />} />
        
        {/* Rota para páginas não encontradas (opcional) */}
        <Route path="*" element={<h1>404 - Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;