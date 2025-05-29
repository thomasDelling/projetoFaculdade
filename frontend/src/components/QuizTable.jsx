import { useEffect, useState } from "react";
import axios from "axios";

const QUIZ_API = "http://localhost:3000/quiz";

export default function QuizTable() {
  const [quizzes, setQuizzes] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [quizForm, setQuizForm] = useState({
    pergunta: "",
    alternativaA: "",
    alternativaB: "",
    alternativaC: "",
    alternativaD: "",
    respostaCorreta: "",
  });

  const [newQuiz, setNewQuiz] = useState({
    pergunta: "",
    alternativaA: "",
    alternativaB: "",
    alternativaC: "",
    alternativaD: "",
    respostaCorreta: "",
  });

  useEffect(() => {
    fetchQuizzes();
  }, []);

  async function fetchQuizzes() {
    try {
      const res = await axios.get(QUIZ_API);
      setQuizzes(res.data);
    } catch (err) {
      console.error("Erro ao buscar quizzes", err);
    }
  }

  function handleChange(e, isNew = false) {
    const { name, value } = e.target;
    isNew
      ? setNewQuiz({ ...newQuiz, [name]: value })
      : setQuizForm({ ...quizForm, [name]: value });
  }

  function startEdit(quiz) {
    setEditingId(quiz._id);
    setQuizForm(quiz);
  }

  function cancelEdit() {
    setEditingId(null);
    setQuizForm({
      pergunta: "",
      alternativaA: "",
      alternativaB: "",
      alternativaC: "",
      alternativaD: "",
      respostaCorreta: "",
    });
  }

  async function saveQuiz(id) {
    try {
      await axios.put(`${QUIZ_API}/${id}`, quizForm);
      setEditingId(null);
      fetchQuizzes();
    } catch (err) {
      console.error("Erro ao atualizar quiz", err);
    }
  }

  async function deleteQuiz(id) {
    if (!window.confirm("Confirmar exclusão?")) return;
    try {
      await axios.delete(`${QUIZ_API}/${id}`);
      fetchQuizzes();
    } catch (err) {
      console.error("Erro ao deletar quiz", err);
    }
  }

  async function createQuiz() {
    const {
      pergunta,
      alternativaA,
      alternativaB,
      alternativaC,
      alternativaD,
      respostaCorreta,
    } = newQuiz;

    if (
      !pergunta ||
      !alternativaA ||
      !alternativaB ||
      !alternativaC ||
      !alternativaD ||
      !respostaCorreta
    )
      return alert("Preencha todos os campos.");

    try {
      await axios.post(QUIZ_API, newQuiz);
      setNewQuiz({
        pergunta: "",
        alternativaA: "",
        alternativaB: "",
        alternativaC: "",
        alternativaD: "",
        respostaCorreta: "",
      });
      fetchQuizzes();
    } catch (err) {
      console.error("Erro ao criar quiz", err);
    }
  }

  return (
    <div>
      <table className="styled-table">
        <thead>
          <tr>
            <th>Pergunta</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>Resposta Correta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {quizzes.map((quiz) =>
            editingId === quiz._id ? (
              <tr key={quiz._id}>
                <td>
                  <input
                    name="pergunta"
                    value={quizForm.pergunta}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="alternativaA"
                    value={quizForm.alternativaA}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="alternativaB"
                    value={quizForm.alternativaB}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="alternativaC"
                    value={quizForm.alternativaC}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="alternativaD"
                    value={quizForm.alternativaD}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <input
                    name="respostaCorreta"
                    value={quizForm.respostaCorreta}
                    onChange={handleChange}
                  />
                </td>
                <td>
                  <button onClick={() => saveQuiz(quiz._id)}>Salvar</button>
                  <button onClick={cancelEdit}>Cancelar</button>
                </td>
              </tr>
            ) : (
              <tr key={quiz._id}>
                <td>{quiz.pergunta}</td>
                <td>{quiz.alternativaA}</td>
                <td>{quiz.alternativaB}</td>
                <td>{quiz.alternativaC}</td>
                <td>{quiz.alternativaD}</td>
                <td>{quiz.respostaCorreta}</td>
                <td>
                  <button onClick={() => startEdit(quiz)}>Editar</button>
                  <button onClick={() => deleteQuiz(quiz._id)}>Excluir</button>
                </td>
              </tr>
            )
          )}

          <tr>
            <td>
              <input
                name="pergunta"
                value={newQuiz.pergunta}
                onChange={(e) => handleChange(e, true)}
              />
            </td>
            <td>
              <input
                name="alternativaA"
                value={newQuiz.alternativaA}
                onChange={(e) => handleChange(e, true)}
              />
            </td>
            <td>
              <input
                name="alternativaB"
                value={newQuiz.alternativaB}
                onChange={(e) => handleChange(e, true)}
              />
            </td>
            <td>
              <input
                name="alternativaC"
                value={newQuiz.alternativaC}
                onChange={(e) => handleChange(e, true)}
              />
            </td>
            <td>
              <input
                name="alternativaD"
                value={newQuiz.alternativaD}
                onChange={(e) => handleChange(e, true)}
              />
            </td>
            <td>
              <input
                name="respostaCorreta"
                value={newQuiz.respostaCorreta}
                onChange={(e) => handleChange(e, true)}
              />
            </td>
            <td>
              <button onClick={createQuiz}>Criar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
