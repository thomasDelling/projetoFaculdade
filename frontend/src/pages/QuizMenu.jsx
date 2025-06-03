import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/QuizMenu.css";

export default function QuizMenu() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h1>🎯 ArenaQuizz</h1>
        <p>Teste seus conhecimentos e se divirta!</p>

        <div className="menu-buttons">
          <button onClick={() => navigate("/quiz")}>🚀 Iniciar Jogo</button>
          <button onClick={() => navigate("/admin")}>⚙️ Configurações</button>
          <button onClick={() => navigate("/login")}>🔒 Logout</button>
        </div>
      </div>
    </div>
  );
}
