import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HomePage.css";

const USER_API = "http://localhost:3000/usuarios";
const QUIZ_API = "http://localhost:3000/quiz";

export default function HomePage() {
  // 🔥 Estados de usuários
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ nome: "", email: "", senha: "" });
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [editUserId, setEditUserId] = useState(null);

  // 🔥 Estados de perguntas
  const [quizzes, setQuizzes] = useState([]);
  const [quizForm, setQuizForm] = useState({
    pergunta: "",
    alternativaA: "",
    alternativaB: "",
    alternativaC: "",
    alternativaD: "",
    respostaCorreta: "",
  });
  const [isEditingQuiz, setIsEditingQuiz] = useState(false);
  const [editQuizId, setEditQuizId] = useState(null);

  // 🚀 Carregar dados
  useEffect(() => {
    fetchUsers();
    fetchQuizzes();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(USER_API);
    setUsers(res.data);
  };

  const fetchQuizzes = async () => {
    const res = await axios.get(QUIZ_API);
    setQuizzes(res.data);
  };

  // 🔧 CRUD Usuários
  const handleUserSubmit = async (e) => {
    e.preventDefault();
    if (!userForm.nome || !userForm.email || !userForm.senha) {
      return alert("Preencha todos os campos.");
    }
    if (isEditingUser) {
      await axios.put(`${USER_API}/${editUserId}`, userForm);
      setIsEditingUser(false);
      setEditUserId(null);
    } else {
      await axios.post(USER_API, userForm);
    }
    setUserForm({ nome: "", email: "", senha: "" });
    fetchUsers();
  };

  const handleEditUser = (u) => {
    setUserForm({ nome: u.nome, email: u.email, senha: u.senha });
    setIsEditingUser(true);
    setEditUserId(u._id);
  };

  const handleDeleteUser = async (id) => {
    if (confirm("Confirma deletar usuário?")) {
      await axios.delete(`${USER_API}/${id}`);
      fetchUsers();
    }
  };

  // 🔧 CRUD Perguntas
  const handleQuizSubmit = async (e) => {
    e.preventDefault();
    const { pergunta, alternativaA, alternativaB, alternativaC, alternativaD, respostaCorreta } = quizForm;
    if (!pergunta || !alternativaA || !alternativaB || !alternativaC || !alternativaD || !respostaCorreta) {
      return alert("Preencha todos os campos.");
    }

    const payload = {
      pergunta,
      alternativas: {
        A: alternativaA,
        B: alternativaB,
        C: alternativaC,
        D: alternativaD,
      },
      respostaCorreta,
    };

    if (isEditingQuiz) {
      await axios.put(`${QUIZ_API}/${editQuizId}`, payload);
      setIsEditingQuiz(false);
      setEditQuizId(null);
    } else {
      await axios.post(QUIZ_API, payload);
    }

    setQuizForm({
      pergunta: "",
      alternativaA: "",
      alternativaB: "",
      alternativaC: "",
      alternativaD: "",
      respostaCorreta: "",
    });
    fetchQuizzes();
  };

  const handleEditQuiz = (q) => {
    setQuizForm({
      pergunta: q.pergunta,
      alternativaA: q.alternativas?.A || "",
      alternativaB: q.alternativas?.B || "",
      alternativaC: q.alternativas?.C || "",
      alternativaD: q.alternativas?.D || "",
      respostaCorreta: q.respostaCorreta,
    });
    setIsEditingQuiz(true);
    setEditQuizId(q._id);
  };

  const handleDeleteQuiz = async (id) => {
    if (confirm("Confirma deletar pergunta?")) {
      await axios.delete(`${QUIZ_API}/${id}`);
      fetchQuizzes();
    }
  };

  return (
    <div className="container">
      

      {/* 🔥 Usuários */}
      <div className="card">
        <h2>Usuários</h2>

        <form onSubmit={handleUserSubmit} className="form">
          <input
            type="text"
            placeholder="Nome"
            value={userForm.nome}
            onChange={(e) => setUserForm({ ...userForm, nome: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={userForm.email}
            onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            value={userForm.senha}
            onChange={(e) => setUserForm({ ...userForm, senha: e.target.value })}
          />
          <button type="submit">{isEditingUser ? "Atualizar" : "Criar"}</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Senha</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.nome}</td>
                <td>{u.email}</td>
                <td>{u.senha}</td>
                <td>
                  <button onClick={() => handleEditUser(u)}>Editar</button>
                  <button onClick={() => handleDeleteUser(u._id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 Perguntas */}
      <div className="card">
        <h2>Perguntas</h2>

        <form onSubmit={handleQuizSubmit} className="form">
          <input
            type="text"
            placeholder="Pergunta"
            value={quizForm.pergunta}
            onChange={(e) => setQuizForm({ ...quizForm, pergunta: e.target.value })}
          />
          <input
            type="text"
            placeholder="Alternativa A"
            value={quizForm.alternativaA}
            onChange={(e) => setQuizForm({ ...quizForm, alternativaA: e.target.value })}
          />
          <input
            type="text"
            placeholder="Alternativa B"
            value={quizForm.alternativaB}
            onChange={(e) => setQuizForm({ ...quizForm, alternativaB: e.target.value })}
          />
          <input
            type="text"
            placeholder="Alternativa C"
            value={quizForm.alternativaC}
            onChange={(e) => setQuizForm({ ...quizForm, alternativaC: e.target.value })}
          />
          <input
            type="text"
            placeholder="Alternativa D"
            value={quizForm.alternativaD}
            onChange={(e) => setQuizForm({ ...quizForm, alternativaD: e.target.value })}
          />
          <input
            type="text"
            placeholder="Resposta Correta"
            value={quizForm.respostaCorreta}
            onChange={(e) => setQuizForm({ ...quizForm, respostaCorreta: e.target.value })}
          />
          <button type="submit">{isEditingQuiz ? "Atualizar" : "Criar"}</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Pergunta</th>
              <th>A</th>
              <th>B</th>
              <th>C</th>
              <th>D</th>
              <th>Correta</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q) => (
              <tr key={q._id}>
                <td>{q.pergunta}</td>
                <td>{q.alternativaA}</td>
                <td>{q.alternativaB}</td>
                <td>{q.alternativaC}</td>
                <td>{q.alternativaD}</td>
                <td>{q.respostaCorreta}</td>
                <td>
                  <button onClick={() => handleEditQuiz(q)}>Editar</button>
                  <button onClick={() => handleDeleteQuiz(q._id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
