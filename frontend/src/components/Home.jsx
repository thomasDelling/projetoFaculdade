import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  const navigate = useNavigate();

  const nome = localStorage.getItem("nome");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="menu-container">
      <div className="menu-card">
        <h1>🎯 ArenaQuizz</h1>
        <p>Teste seus conhecimentos e se divirta!</p>

        <div className="menu-buttons">
          <button onClick={() => navigate("/jogo")}>🚀 Iniciar Jogo</button>
          <button onClick={handleLogout}>🔒 Logout</button>
        </div>
      </div>
    </div>
  );
}
