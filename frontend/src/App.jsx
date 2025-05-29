// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage'; // <--- Adiciona o HomePage

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Quando acessar "/" vai abrir o LoginPage */}
        <Route path="/" element={<LoginPage />} />

        {/* Rota tradicional também funciona */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Nova rota para Home */}
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
