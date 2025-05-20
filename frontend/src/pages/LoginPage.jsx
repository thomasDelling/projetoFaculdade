// src/pages/LoginPage.jsx

import React from 'react';
import './../styles/LoginPage.css'; // Import the CSS file for styling

function LoginPage() {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
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
      </div>
    </div>
  );
}

export default LoginPage;
