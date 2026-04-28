import { useEffect, useState } from "react";
import {
  listarProdutos,
  atualizarProduto,
  excluirProduto,
} from "../services/api";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarProdutos() {
    try {
      const dados = await listarProdutos();
      setProdutos(dados);
    } catch (error) {
      console.log(error);
      setErro("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    try {
      await excluirProduto(id);
      carregarProdutos();
    } catch (error) {
      console.log(error);
      alert("Erro ao excluir produto");
    }
  }

  async function handleEditar(produto) {
    const novoNome = prompt("Novo nome:", produto.nomep);

    if (!novoNome) return;

    try {
      await atualizarProduto(produto.idp, {
        nomep: novoNome,
      });

      carregarProdutos();
    } catch (error) {
      console.log(error);
      alert("Erro ao editar produto");
    }
  }

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nomep.toLowerCase().includes(busca.toLowerCase()) ||
    String(produto.idp).includes(busca)
  );

  if (loading) return <p>Carregando...</p>;
  if (erro) return <p>{erro}</p>;

  return (
    <div className="container">
      <h2>Lista de Produtos</h2>

      <div className="card">
        <input
          type="text"
          placeholder="Buscar por nome ou ID..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {produtosFiltrados.length === 0 ? (
        <p>Nenhum produto encontrado</p>
      ) : (
        produtosFiltrados.map((produto) => (
          <div className="card" key={produto.idp}>
            <h3>{produto.nomep}</h3>
            <p><strong>ID:</strong> {produto.idp}</p>
            <p><strong>Categoria:</strong> {produto.categoria}</p>
            <p><strong>Preço:</strong> R$ {produto.preco}</p>
            <p><strong>Estoque:</strong> {produto.estoque}</p>

            <div>
              <button onClick={() => handleEditar(produto)}>
                Editar
              </button>

              <button onClick={() => handleExcluir(produto.idp)}>
                Excluir
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Produtos;
