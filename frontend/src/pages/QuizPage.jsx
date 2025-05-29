import UserTable from '../components/UserTable';
import QuizTable from '../components/QuizTable';
import './../styles/HomePage.css';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Painel de Administração</h1>
      
      <h2>Usuários</h2>
      <UserTable />
      
      <h2>Quizzes</h2>
      <QuizTable />
    </div>
  );
}
