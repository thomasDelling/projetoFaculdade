import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../styles/HomePage.css";

const USER_API = "http://localhost:3000/usuarios";
const QUIZ_API = "http://localhost:3000/quizzes";

function HomePage() {
  const [users, setUsers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

  const [editingUserId, setEditingUserId] = useState(null);
  const [editingQuizId, setEditingQuizId] = useState(null);

  const [userForm, setUserForm] = useState({ nome: "", email: "", senha: "" });
  const [newUser, setNewUser] = useState({ nome: "", email: "", senha: "" });

  const [quizForm, setQuizForm] = useState({ titulo: "", descricao: "", dificuldade: "" });
  const [newQuiz, setNewQuiz] = useState({ titulo: "", descricao: "", dificuldade: "" });

  const [showPasswordUserId, setShowPasswordUserId] = useState(null);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    fetchUsers();
    fetchQuizzes();
  }, []);

  const isValidEmail = email => email.includes("@");

  async function fetchUsers() {
    try {
      const res = await axios.get(USER_API);
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
    }
  }

  async function fetchQuizzes() {
    try {
      const res = await axios.get(QUIZ_API);
      setQuizzes(res.data);
    } catch (err) {
      console.error("Erro ao buscar quizzes", err);
    }
  }

  function handleUserChange(e, isNew = false) {
    const { name, value } = e.target;
    isNew
      ? setNewUser({ ...newUser, [name]: value })
      : setUserForm({ ...userForm, [name]: value });
  }

  function handleQuizChange(e, isNew = false) {
    const { name, value } = e.target;
    isNew
      ? setNewQuiz({ ...newQuiz, [name]: value })
      : setQuizForm({ ...quizForm, [name]: value });
  }

  function startUserEdit(user) {
    setEditingUserId(user._id);
    setUserForm(user);
    setShowPasswordUserId(null);
  }

  function startQuizEdit(quiz) {
    setEditingQuizId(quiz._id);
    setQuizForm(quiz);
  }

  function cancelUserEdit() {
    setEditingUserId(null);
    setUserForm({ nome: "", email: "", senha: "" });
    setShowPasswordUserId(null);
  }

  function cancelQuizEdit() {
    setEditingQuizId(null);
    setQuizForm({ titulo: "", descricao: "", dificuldade: "" });
  }

  async function saveUser(id) {
    if (!userForm.nome || !userForm.email || !userForm.senha) return alert("Preencha todos os campos.");
    if (!isValidEmail(userForm.email)) return alert("Email inválido. Deve conter '@'.");

    try {
      await axios.put(`${USER_API}/${id}`, userForm);
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  }

  async function saveQuiz(id) {
    if (!quizForm.titulo || !quizForm.descricao || !quizForm.dificuldade)
      return alert("Preencha todos os campos.");

    try {
      await axios.put(`${QUIZ_API}/${id}`, quizForm);
      setEditingQuizId(null);
      fetchQuizzes();
    } catch (err) {
      console.error("Erro ao atualizar quiz", err);
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Confirmar exclusão?")) return;
    try {
      await axios.delete(`${USER_API}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao deletar usuário", err);
    }
  }

  async function deleteQuiz(id) {
    if (!window.confirm("Confirmar exclusão do quiz?")) return;
    try {
      await axios.delete(`${QUIZ_API}/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error("Erro ao deletar quiz", err);
    }
  }

  async function createUser() {
    const { nome, email, senha } = newUser;
    if (!nome || !email || !senha) return alert("Preencha todos os campos.");
    if (!isValidEmail(email)) return alert("Email inválido. Deve conter '@'.");

    try {
      await axios.post(USER_API, newUser);
      setNewUser({ nome: "", email: "", senha: "" });
      setShowNewPassword(false);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao criar usuário", err);
    }
  }

  async function createQuiz() {
    const { titulo, descricao, dificuldade } = newQuiz;
    if (!titulo || !descricao || !dificuldade) return alert("Preencha todos os campos.");

    try {
      await axios.post(QUIZ_API, newQuiz);
      setNewQuiz({ titulo: "", descricao: "", dificuldade: "" });
      fetchQuizzes();
    } catch (err) {
      console.error("Erro ao criar quiz", err);
    }
  }

  return (
    <div className="home-container">
      <h1>Usuários</h1>
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
          {users.map(user =>
            editingUserId === user._id ? (
              <tr key={user._id}>
                <td><input name="nome" value={userForm.nome} onChange={handleUserChange} /></td>
                <td><input name="email" value={userForm.email} onChange={handleUserChange} /></td>
                <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <input
                    name="senha"
                    type={showPasswordUserId === user._id ? "text" : "password"}
                    value={userForm.senha}
                    onChange={handleUserChange}
                    style={{ flex: 1 }}
                  />
                  <button onClick={() =>
                    setShowPasswordUserId(showPasswordUserId === user._id ? null : user._id)
                  }>
                    {showPasswordUserId === user._id ? "Ocultar" : "Mostrar"}
                  </button>
                </td>
                <td>
                  <button style={{ marginRight: "10px" }} onClick={() => saveUser(user._id)}>Salvar</button>
                  <button onClick={cancelUserEdit}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={user._id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>******</td>
                <td>
                  <button style={{ marginRight: "10px" }} onClick={() => startUserEdit(user)}>Editar</button>
                  <button onClick={() => deleteUser(user._id)}>Excluir</button>
                </td>
              </tr>
            )
          )}
          <tr>
            <td><input name="nome" value={newUser.nome} onChange={e => handleUserChange(e, true)} /></td>
            <td><input name="email" value={newUser.email} onChange={e => handleUserChange(e, true)} /></td>
            <td style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                name="senha"
                type={showNewPassword ? "text" : "password"}
                value={newUser.senha}
                onChange={e => handleUserChange(e, true)}
                style={{ flex: 1 }}
              />
              <button onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? "Ocultar" : "Mostrar"}
              </button>
            </td>
            <td><button onClick={createUser}>Criar</button></td>
          </tr>
        </tbody>
      </table>

      {/* Botão Jogar */}
      <div style={{ margin: "30px 0", textAlign: "center" }}>
        <button onClick={() => alert("Iniciando o jogo...")}>🎮 Jogar</button>
      </div>

      <h1>Quizzes</h1>
      <table>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descrição</th>
            <th>Dificuldade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map(quiz =>
            editingQuizId === quiz._id ? (
              <tr key={quiz._id}>
                <td><input name="titulo" value={quizForm.titulo} onChange={handleQuizChange} /></td>
                <td><input name="descricao" value={quizForm.descricao} onChange={handleQuizChange} /></td>
                <td><input name="dificuldade" value={quizForm.dificuldade} onChange={handleQuizChange} /></td>
                <td>
                  <button style={{ marginRight: "10px" }} onClick={() => saveQuiz(quiz._id)}>Salvar</button>
                  <button onClick={cancelQuizEdit}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={quiz._id}>
                <td>{quiz.titulo}</td>
                <td>{quiz.descricao}</td>
                <td>{quiz.dificuldade}</td>
                <td>
                  <button style={{ marginRight: "10px" }} onClick={() => startQuizEdit(quiz)}>Editar</button>
                  <button onClick={() => deleteQuiz(quiz._id)}>Excluir</button>
                </td>
              </tr>
            )
          )}
          <tr>
            <td><input name="titulo" value={newQuiz.titulo} onChange={e => handleQuizChange(e, true)} /></td>
            <td><input name="descricao" value={newQuiz.descricao} onChange={e => handleQuizChange(e, true)} /></td>
            <td><input name="dificuldade" value={newQuiz.dificuldade} onChange={e => handleQuizChange(e, true)} /></td>
            <td><button onClick={createQuiz}>Criar</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default HomePage;
