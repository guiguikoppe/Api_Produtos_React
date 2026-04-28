const API_URL = "http://localhost:3000/produtos";

// GET - listar todos
export async function listarProdutos() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Erro ao buscar produtos");
  }

  return await response.json();
}

// POST - criar
export async function criarProduto(produto) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao cadastrar produto");
  }

  return await response.json();
}

// PUT - editar
export async function atualizarProduto(id, produto) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(produto),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar produto");
  }

  return await response.json();
}

// DELETE - excluir
export async function excluirProduto(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Erro ao excluir produto");
  }

  return await response.json();
}