import { useEffect, useState, useCallback } from "react";
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

  // ===== CARREGAR PRODUTOS =====
  const carregarProdutos = useCallback(async () => {
    try {
      setLoading(true);
      setErro("");

      const dados = await listarProdutos();
      setProdutos(dados || []);
    } catch (error) {
      console.error(error);
      setErro("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarProdutos();
  }, [carregarProdutos]);

  // ===== EXCLUIR =====
  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Deseja realmente excluir este produto?"
    );

    if (!confirmar) return;

    try {
      await excluirProduto(id);
      await carregarProdutos();
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir produto");
    }
  }

  // ===== EDITAR (AGORA EDITA TUDO) =====
  async function handleEditar(produto) {
    const nomep = prompt("Nome:", produto.nomep);
    const categoria = prompt("Categoria:", produto.categoria);
    const preco = prompt("Preço:", produto.preco);
    const estoque = prompt("Estoque:", produto.estoque);

    try {
      await atualizarProduto(produto.idp, {
        nomep,
        categoria,
        preco,
        estoque,
      });

      await carregarProdutos();
    } catch (error) {
      console.error(error);
      alert("Erro ao editar produto");
    }
  }

  // ===== FILTRO =====
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nomep?.toLowerCase().includes(busca.toLowerCase()) ||
    String(produto.idp).includes(busca)
  );

  // ===== UI =====
  if (loading) return <p>Carregando produtos...</p>;
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

            <div className="botoes">
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