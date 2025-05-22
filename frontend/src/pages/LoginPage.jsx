// src/pages/LoginPage.jsx

import React from "react";
import "./../styles/LoginPage.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";
// Importing Link from react-router-dom for navigation

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div>
            <label>Nome</label>
            <input type="text" />
          </div>
          <div>
            <label>Email</label>
            <input type="email" />
          </div>
          <div>
            <label>Senha</label>
            <input type="password" />
          </div>
          <button type="submit">Entrar</button>
        </form>
        <p>
          Não tem conta? <Link to="/register">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
