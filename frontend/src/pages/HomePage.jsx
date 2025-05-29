// src/pages/HomePage.jsx
import UserCrud from "../components/userCrud";
import QuizCrud from "../components/quizCrud";

function HomePage() {
  return (
    <div className="home-container">
      <h1>Bem-vindo à ArenaQuizz</h1>
      <UserCrud />
      <button className="play-button">Jogar</button>
      <QuizCrud />
    </div>
  );
}

export default HomePage; // <= Adicione esta linha
