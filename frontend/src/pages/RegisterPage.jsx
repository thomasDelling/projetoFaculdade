import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./../styles/RegisterPage.css";

function RegisterPage() {
  const navigate = useNavigate();

  // Estados para os inputs
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação simples de senha
    if (senha !== confirmaSenha) {
      setMensagem("As senhas não conferem");
      return;
    }

    // Envia para backend
    try {
      const response = await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem("Usuário criado com sucesso!");
        // Limpa campos
        setNome("");
        setEmail("");
        setSenha("");
        setConfirmaSenha("");
        // Navega para login depois de 2 segundos
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setMensagem(`Erro: ${data.mensagem || "Algo deu errado"}`);
      }
    } catch (error) {
      setMensagem("Erro na conexão com o servidor");
    }
  };

  return (
      <div className="login-container">
      <div className="login-box">
        <h2>ArenaQuizz - Cadastro</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Confirmar</button>
        </form>
        <p>{mensagem}</p>
        <p>
          Já possui uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
      </div>
  );
}

export default RegisterPage;
