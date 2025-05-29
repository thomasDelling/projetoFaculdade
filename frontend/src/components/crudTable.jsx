// src/components/CrudTable.jsx
import React, { useState, useEffect } from "react";
import "../styles/CrudTable.css";

function CrudTable({ title, fields, fetchUrl }) {
  const [data, setData] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({});

  const fetchData = async () => {
    try {
      const res = await fetch(fetchUrl);
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchUrl]);

  // Função para pegar valor do item, incluindo array indexado com notação `campo[index]`
  const getValue = (item, name) => {
    const match = name.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const arrName = match[1];
      const index = Number(match[2]);
      return item[arrName]?.[index] || "";
    }
    return item[name] || "";
  };

  // Função para preencher formData quando clica em editar, tratando array também
  const prepareFormData = (item) => {
    const obj = {};
    fields.forEach((f) => {
      const match = f.name.match(/(\w+)\[(\d+)\]/);
      if (match) {
        const arrName = match[1];
        if (!obj[arrName]) obj[arrName] = [];
        obj[arrName][Number(match[2])] = item[arrName]?.[Number(match[2])] || "";
      } else {
        obj[f.name] = item[f.name] || "";
      }
    });
    return obj;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const match = name.match(/(\w+)\[(\d+)\]/);
    if (match) {
      const arrName = match[1];
      const index = Number(match[2]);
      setFormData((f) => {
        const arr = f[arrName] ? [...f[arrName]] : [];
        arr[index] = value;
        return { ...f, [arrName]: arr };
      });
    } else {
      setFormData((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${fetchUrl}/${editingId}` : fetchUrl;

      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setFormData({});
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  const handleEdit = (item) => {
    setFormData(prepareFormData(item));
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${fetchUrl}/${id}`, { method: "DELETE" });
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar:", error);
    }
  };

  return (
    <div className="table-box">
      <h2>{title}</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        {fields.map((f) => (
          <input
            key={f.name}
            name={f.name}
            placeholder={f.label}
            type={f.type || "text"}
            value={
              // para arrays
              Array.isArray(formData[f.name])
                ? formData[f.name].join(", ")
                : formData[f.name] || ""
            }
            onChange={handleChange}
            required={f.required !== false}
            autoComplete="off"
          />
        ))}
        <button type="submit">{editingId ? "Atualizar" : "Criar"}</button>
      </form>

      <table>
        <thead>
          <tr>
            {fields.map((f) => (
              <th key={f.name}>{f.label}</th>
            ))}
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              {fields.map((f) => (
                <td key={f.name}>{getValue(item, f.name)}</td>
              ))}
              <td>
                <button onClick={() => handleEdit(item)}>Editar</button>
                <button onClick={() => handleDelete(item._id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;
