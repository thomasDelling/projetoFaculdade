import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Jogo.css";

const QUIZ_API = "http://localhost:3000/quiz";
const nomeUsuario = localStorage.getItem("nome") || "Usuário";

export default function Jogo() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState("");
  const [noQuestions, setNoQuestions] = useState(false); // nova flag

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(QUIZ_API);
        setQuestions(res.data);
      } catch (err) {
        setError("Erro ao carregar as perguntas.");
      }
    };

    fetchQuestions();

   
    const timeoutId = setTimeout(() => {
      if (questions.length === 0) {
        setNoQuestions(true);
      }
    }, 3000);

    
    return () => clearTimeout(timeoutId);
  }, [questions.length]); 

  const handleAnswer = (selected) => {
    const correct = questions[current].respostaCorreta;

    if (selected === correct) {
      setScore((prev) => prev + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setNoQuestions(false);
  };

  if (error) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">{error}</div>
      </div>
    );
  }

  if (noQuestions) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          Não há perguntas no momento, por favor consultar o admin.
        </div>
      </div>
    );
  }

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
            você acertou {score} de {questions.length} perguntas
          </p>
          <div className="result-buttons">
            <button onClick={resetGame}>🔄 Jogar Novamente</button>
            <button onClick={() => navigate("/home")}>🏠 Home</button>
          </div>
        </div>
      </div>
    );
  }

  const { pergunta, alternativas } = questions[current];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2>
          Pergunta {current + 1} de {questions.length}
        </h2>
        <p className="question">{pergunta}</p>

        <div className="answers">
          <button onClick={() => handleAnswer("A")}>A: {alternativas.A}</button>
          <button onClick={() => handleAnswer("B")}>B: {alternativas.B}</button>
          <button onClick={() => handleAnswer("C")}>C: {alternativas.C}</button>
          <button onClick={() => handleAnswer("D")}>D: {alternativas.D}</button>
        </div>
      </div>
    </div>
  );
}
