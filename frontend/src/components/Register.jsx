// src/components/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Register.css";

function RegisterPage() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [loading, setLoading] = useState(false);

  const validarEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validarEmail(email)) {
      setMensagem("Email inválido");
      return;
    }

    if (senha.length < 6) {
      setMensagem("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    if (senha !== confirmaSenha) {
      setMensagem("As senhas não conferem");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Usuário criado com sucesso!");
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMensagem(data.message || "Erro ao criar usuário");
      }
    } catch (error) {
      setMensagem("Erro na conexão com o servidor");
    }

    setLoading(false);
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>ArenaQuizz - Cadastro</h2>
        <form onSubmit={handleSubmit}>
          {}
          <div className="form-grid">
            <div>
              <label>Nome</label>
              <input
                type="text"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label>Senha</label>
              <input
                type="password"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            <div>
              <label>Confirme sua senha</label>
              <input
                type="password"
                required
                value={confirmaSenha}
                onChange={(e) => setConfirmaSenha(e.target.value)}
              />
            </div>
          </div> {}

          <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Confirmar"}
          </button>
        </form>

        {mensagem && (
          <p
            className={`mensagem-feedback ${
              mensagem === "Usuário criado com sucesso!" ? "success" : "error"
            }`}
          >
            {mensagem}
          </p>
        )}

        <p className="login-link">
          Já possui uma conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;