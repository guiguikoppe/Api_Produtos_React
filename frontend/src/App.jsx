import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Cadastro from "./pages/Cadastro";
import Sobre from "./pages/sobrenos";

import "./App.css";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <nav className="navbar">
        

        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/produtos" onClick={() => setMenuOpen(false)}>Produtos</Link>
          <Link to="/cadastro" onClick={() => setMenuOpen(false)}>Cadastro</Link>
          <Link to="/sobre" onClick={() => setMenuOpen(false)}>Sobre</Link>
        </div>

      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/sobre" element={<Sobre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;