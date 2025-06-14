import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/UserManager.css";

const USER_API = "http://localhost:3000/usuarios";

export default function UserManager() {
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({ nome: "", email: "", senha: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await axios.get(USER_API);
    setUsers(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await axios.put(`${USER_API}/${editId}`, userForm);
      setIsEditing(false);
      setEditId(null);
    } else {
      await axios.post(USER_API, userForm);
    }
    setUserForm({ nome: "", email: "", senha: "" });
    fetchUsers();
  };

  const handleEdit = (u) => {
    setUserForm({ nome: u.nome, email: u.email, senha: u.senha });
    setIsEditing(true);
    setEditId(u._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirma deletar?")) {
      await axios.delete(`${USER_API}/${id}`);
      fetchUsers();
    }
  };

  return (
    <div className="user-manager">
      <h2>Gerenciar Usuários</h2>
      <button onClick={() => navigate("/admin")}>Voltar</button>

      <form onSubmit={handleSubmit}>
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
        <button type="submit">{isEditing ? "Atualizar" : "Criar"}</button>
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
                <button onClick={() => handleEdit(u)}>Editar</button>
                <button onClick={() => handleDelete(u._id)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
