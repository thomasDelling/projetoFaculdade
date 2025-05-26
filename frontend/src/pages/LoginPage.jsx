// src/pages/LoginPage.jsx

import React from "react";
import "./../styles/LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ArenaQuizz - Login</h2>
        <form>
          <div>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" aria-label="Email" />
          </div>
          <div>
            <label htmlFor="senha">Senha</label>
            <input id="senha" type="password" aria-label="Senha" />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não possui conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
