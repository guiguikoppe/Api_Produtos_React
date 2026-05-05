const API_URL = "http://localhost:3000/produtos";

// LISTAR
export async function listarProdutos() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return await response.json();
}

// CRIAR
export async function criarProduto(produto) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  });

  if (!response.ok) {
    throw new Error("Erro ao criar produto");
  }

  return await response.json();
}

// ATUALIZAR (CORRIGIDO)
export async function atualizarProduto(id, produto) {
  console.log("Enviando:", produto);

  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(produto)
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.mensagem || "Erro ao atualizar");
  }

  return data;
}

// DELETAR
export async function excluirProduto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir");
  }

  return await response.json();
}