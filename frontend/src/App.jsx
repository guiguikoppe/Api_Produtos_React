import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import Home from "./pages/Home";
import Produtos from "./pages/Produtos";
import Cadastro from "./pages/Cadastro";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/produtos">Produtos</Link> |{" "}
          <Link to="/cadastro">Cadastro</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/cadastro" element={<Cadastro />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;