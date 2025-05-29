import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/users";

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formUser, setFormUser] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  const [newUser, setNewUser] = useState({
    nome: "",
    email: "",
    senha: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await axios.get(API_URL);
      setUsers(res.data);
    } catch (err) {
      console.error("Erro ao buscar usuários", err);
    }
  }

  function handleChange(e, isNew = false) {
    const { name, value } = e.target;
    if (isNew) {
      setNewUser({ ...newUser, [name]: value });
    } else {
      setFormUser({ ...formUser, [name]: value });
    }
  }

  function startEdit(user) {
    setEditingId(user._id);
    setFormUser(user);
  }

  function cancelEdit() {
    setEditingId(null);
    setFormUser({ nome: "", email: "", senha: "" });
  }

  async function saveUser(id) {
    try {
      await axios.put(`${API_URL}/${id}`, formUser);
      setEditingId(null);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao atualizar usuário", err);
    }
  }

  async function deleteUser(id) {
    if (!window.confirm("Confirma exclusão?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchUsers();
    } catch (err) {
      console.error("Erro ao deletar usuário", err);
    }
  }

  async function createUser() {
    const { nome, email, senha } = newUser;
    if (!nome || !email || !senha) return alert("Preencha todos os campos.");

    try {
      await axios.post(API_URL, newUser);
      setNewUser({ nome: "", email: "", senha: "" });
      fetchUsers();
    } catch (err) {
      console.error("Erro ao criar usuário", err);
    }
  }

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Senha</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) =>
            editingId === user._id ? (
              <tr key={user._id}>
                <td>
                  <input
                    name="nome"
                    value={formUser.nome}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="email"
                    value={formUser.email}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="senha"
                    value={formUser.senha}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={() => saveUser(user._id)}>Salvar</button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={user._id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.senha}</td>
                <td>
                  <button onClick={() => startEdit(user)}>Editar</button>
                  <button onClick={() => deleteUser(user._id)}>Excluir</button>
                </td>
              </tr>
            )
          )}

          <tr>
            <td>
              <input
                name="nome"
                value={newUser.nome}
                onChange={(e) => handleChange(e, true)}
                placeholder="Nome"
              />
            </td>
            <td>
              <input
                name="email"
                value={newUser.email}
                onChange={(e) => handleChange(e, true)}
                placeholder="Email"
              />
            </td>
            <td>
              <input
                name="senha"
                value={newUser.senha}
                onChange={(e) => handleChange(e, true)}
                placeholder="Senha"
              />
            </td>
            <td>
              <button onClick={createUser}>Adicionar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
