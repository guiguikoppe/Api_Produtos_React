
// Cadastro.jsx
import { useState } from "react";
import { criarProduto } from "../services/api";

function Cadastro() {
  const [nomep, setNomep] = useState("");
  const [categoria, setCategoria] = useState("");
  const [preco, setPreco] = useState("");
  const [estoque, setEstoque] = useState("");
  const [mensagem, setMensagem] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nomep || !categoria || !preco || !estoque) {
      setMensagem("Preencha todos os campos");
      return;
    }

    try {
      await criarProduto({
        nomep,
        categoria,
        preco,
        estoque,
      });

      setMensagem("Produto cadastrado com sucesso!");
      setNomep("");
      setCategoria("");
      setPreco("");
      setEstoque("");
    } catch (error) {
      console.log(error);
      setMensagem("Erro ao cadastrar produto");
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Produto</h2>

        <input
          type="text"
          placeholder="Nome do produto"
          value={nomep}
          onChange={(e) => setNomep(e.target.value)}
        />

        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />

        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
        />

        <button type="submit">Cadastrar</button>

        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
}

export default Cadastro;