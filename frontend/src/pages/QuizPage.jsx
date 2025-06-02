import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/QuizPage.css";

const QUIZ_API = "http://localhost:3000/quiz";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(QUIZ_API).then((res) => {
      setQuestions(res.data);
    });
  }, []);

  const handleAnswer = (selected) => {
    const correct = questions[current].respostaCorreta;

    if (selected === correct) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">Carregando perguntas...</div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="quiz-container">
        <div className="quiz-card result">
          <h2>🎉 Resultado Final</h2>
          <p>
            Você acertou {score} de {questions.length} perguntas.
          </p>
          <div className="result-buttons">
            <button onClick={() => window.location.reload()}>🔄 Jogar Novamente</button>
            <button onClick={() => navigate("/menu")}>🏠 Menu</button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>
          Pergunta {current + 1} de {questions.length}
        </h2>
        <p className="question">{q.pergunta}</p>

        <div className="answers">
          <button onClick={() => handleAnswer("A")}>A: {q.alternativaA}</button>
          <button onClick={() => handleAnswer("B")}>B: {q.alternativaB}</button>
          <button onClick={() => handleAnswer("C")}>C: {q.alternativaC}</button>
          <button onClick={() => handleAnswer("D")}>D: {q.alternativaD}</button>
        </div>
      </div>
    </div>
  );
}
