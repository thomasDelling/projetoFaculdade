import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/ReL.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha })
    });

    if (res.ok) {
      const data = await res.json();
      // Alterado: Redireciona para o menu em vez do quiz
      navigate("/menu");
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ArenaQuizz - Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              required
            />
          </div>
          {erro && <p style={{ color: "red" }}>{erro}</p>}
          <button type="submit">Entrar</button>
        </form>
        <p>Não possui conta? <a href="/register">Cadastre-se</a></p>
      </div>
    </div>
  );
}

export default LoginPage;