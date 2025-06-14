import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

export default function Admin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="admin-page">
      <h1>Painel Administrativo - ArenaQuizz</h1>
      <div className="admin-buttons">
        <button onClick={() => navigate("/admin/usuarios")}>
          Gerenciar Usuários
        </button>
        <button onClick={() => navigate("/admin/perguntas")}>
          Gerenciar Perguntas
        </button>
      </div>
      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
