// src/components/QuizCrud.jsx
import React from "react";
import CrudTable from "./crudTable";

const quizFields = [
  { name: "pergunta", label: "Pergunta" },
  { name: "alternativas[0]", label: "Alternativa 1" },
  { name: "alternativas[1]", label: "Alternativa 2" },
  { name: "alternativas[2]", label: "Alternativa 3" },
  { name: "alternativas[3]", label: "Alternativa 4" },
  { name: "respostaCorreta", label: "Resposta Correta" },
];

function QuizCrud() {
  return (
    <CrudTable
      title="Gerenciar Perguntas do Quiz"
      fields={quizFields}
      fetchUrl="http://localhost:3000/quizzes"
    />
  );
}

export default QuizCrud;
