// src/components/UserCrud.jsx
import React from "react";
import CrudTable from "./crudTable";

const userFields = [
  { name: "nome", label: "Nome" },
  { name: "email", label: "Email", type: "email" },
  { name: "senha", label: "Senha", type: "password" },
];

function UserCrud() {
  return (
    <CrudTable
      title="Gerenciar Usuários"
      fields={userFields}
      fetchUrl="http://localhost:3000/usuarios"
    />
  );
}

export default UserCrud;
