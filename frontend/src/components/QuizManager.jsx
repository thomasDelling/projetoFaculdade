import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/QuizManager.css";

const QUIZ_API = "http://localhost:3003/quizzes";

export default function QuizManager() {
  const [quizzes, setQuizzes] = useState([]);
  const [quizForm, setQuizForm] = useState({
    pergunta: "",
    alternativaA: "",
    alternativaB: "",
    alternativaC: "",
    alternativaD: "",
    respostaCorreta: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const navigate = useNavigate();
  const [showQuizList, setShowQuizList] = useState(false);

  useEffect(() => {
    if (showQuizList) {
      fetchQuizzes();
    }
  }, [showQuizList]);

  const fetchQuizzes = async () => {
    try {
      const res = await axios.get(QUIZ_API);
      setQuizzes(res.data);
    } catch (error) {
      console.error("Erro ao buscar quizzes:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      pergunta: quizForm.pergunta,
      alternativas: {
        A: quizForm.alternativaA,
        B: quizForm.alternativaB,
        C: quizForm.alternativaC,
        D: quizForm.alternativaD,
      },
      respostaCorreta: quizForm.respostaCorreta,
    };

    try {
      if (isEditing) {
        await axios.put(`${QUIZ_API}/${editId}`, payload);
        setIsEditing(false);
        setEditId(null);
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

      if (showQuizList) {
        fetchQuizzes();
      }
    } catch (error) {
      console.error("Erro ao salvar quiz:", error);
    }
  };

  const handleEdit = (q) => {
    setQuizForm({
      pergunta: q.pergunta,
      alternativaA: q.alternativas?.A || "",
      alternativaB: q.alternativas?.B || "",
      alternativaC: q.alternativas?.C || "",
      alternativaD: q.alternativas?.D || "",
      respostaCorreta: q.respostaCorreta,
    });
    setIsEditing(true);
    setEditId(q._id);
    setShowQuizList(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Confirma deletar?")) {
      try {
        await axios.delete(`${QUIZ_API}/${id}`);
        if (showQuizList) {
          fetchQuizzes();
        }
      } catch (error) {
        console.error("Erro ao deletar quiz:", error);
      }
    }
  };

  return (
    <div className="quiz-manager">
      {/* TOPO */}
      <div className="quiz-manager-fixed-top">
        <div className="quiz-manager-header-top">
          <h2>Gerenciar Perguntas</h2>
          <button onClick={() => navigate("/admin")} className="back-button">
            Voltar
          </button>
        </div>

        <div className="quiz-crud-controls">
          {/* FORMULÁRIO */}
          <form onSubmit={handleSubmit} className="quiz-form">
            <input
              type="text"
              placeholder="Pergunta"
              value={quizForm.pergunta}
              onChange={(e) =>
                setQuizForm({ ...quizForm, pergunta: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Alternativa A"
              value={quizForm.alternativaA}
              onChange={(e) =>
                setQuizForm({ ...quizForm, alternativaA: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Alternativa B"
              value={quizForm.alternativaB}
              onChange={(e) =>
                setQuizForm({ ...quizForm, alternativaB: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Alternativa C"
              value={quizForm.alternativaC}
              onChange={(e) =>
                setQuizForm({ ...quizForm, alternativaC: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Alternativa D"
              value={quizForm.alternativaD}
              onChange={(e) =>
                setQuizForm({ ...quizForm, alternativaD: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Alternativa Correta (A, B, C ou D)"
              value={quizForm.respostaCorreta}
              onChange={(e) =>
                setQuizForm({
                  ...quizForm,
                  respostaCorreta: e.target.value.toUpperCase(),
                })
              }
              maxLength="1"
              required
            />

            <div className="quiz-action-buttons">
              <button type="submit" className="submit-button">
                {isEditing ? "Atualizar Pergunta" : "Criar Pergunta"}
              </button>
              <button
                type="button"
                onClick={() => setShowQuizList(!showQuizList)}
                className="list-quizzes-button"
              >
                {showQuizList ? "Ocultar Perguntas" : "Listar Perguntas"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* LISTA */}
      {showQuizList && (
        <div className="quiz-manager-content">
          <div className="table-responsive-wrapper">
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
                    <td>{q.alternativas?.A}</td>
                    <td>{q.alternativas?.B}</td>
                    <td>{q.alternativas?.C}</td>
                    <td>{q.alternativas?.D}</td>
                    <td>{q.respostaCorreta}</td>
                    <td>
                      <button onClick={() => handleEdit(q)}>Editar</button>
                      <button onClick={() => handleDelete(q._id)}>
                        Deletar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
