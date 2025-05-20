import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/LoginPage.css';

function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // aqui você pode validar as senhas antes
    navigate('/login');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Cadastro</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Nome</label>
            <input type="text" required />
          </div>
          <div>
            <label>Email</label>
            <input type="email" required />
          </div>
          <div>
            <label>Senha</label>
            <input type="password" required />
          </div>
          <div>
            <label>Confirme sua senha</label>
            <input type="password" required />
          </div>
          <button type="submit">Confirmar</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
