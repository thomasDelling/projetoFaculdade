import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizMenu.css";

export default function QuizMenu() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aqui você pode adicionar lógica de logout se necessário
    navigate("/login");
  };

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h1>🎯 ArenaQuizz</h1>
        <p>Teste seus conhecimentos e se divirta!</p>

        <div className="menu-buttons">
          <button onClick={() => navigate("/quiz")}>🚀 Iniciar Jogo</button>
          <button onClick={() => navigate("/admin")}>⚙️ Configurações</button>
          <button onClick={handleLogout}>🔒 Logout</button>
        </div>
      </div>
    </div>
  );
}