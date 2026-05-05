const ProdutoModel = require('../models/produtosModel');

// LISTAR
async function listarTodos(req, res) {
  try {
    const produtos = await ProdutoModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar', erro: erro.message });
  }
}

// BUSCAR ID
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const produto = await ProdutoModel.buscarPorId(id);

    if (!produto) {
      return res.status(404).json({ mensagem: 'Produto não encontrado' });
    }

    res.status(200).json(produto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// BUSCAR NOME
async function buscarPorNome(req, res) {
  try {
    const { nome } = req.params;
    const produtos = await ProdutoModel.buscarPorNome(nome);

    if (!produtos.length) {
      return res.status(404).json({
        mensagem: 'Nenhum produto encontrado'
      });
    }

    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// CRIAR
async function criar(req, res) {
  try {
    const { nomep, categoria, preco, estoque } = req.body;

    if (!nomep || !categoria || preco == null || estoque == null) {
      return res.status(400).json({
        mensagem: 'Todos os campos são obrigatórios'
      });
    }

    const novo = await ProdutoModel.criar({
      nomep,
      categoria,
      preco,
      estoque
    });

    res.status(201).json(novo);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// ATUALIZAR (CORRIGIDO)
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nomep, categoria, preco, estoque } = req.body;

    const atualizado = await ProdutoModel.atualizar(id, {
      nomep,
      categoria,
      preco,
      estoque
    });

    if (!atualizado) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado ou nada para atualizar'
      });
    }

    res.status(200).json(atualizado);

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

// DELETAR
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deletado = await ProdutoModel.deletar(id);

    if (!deletado) {
      return res.status(404).json({
        mensagem: 'Produto não encontrado'
      });
    }

    res.status(200).json({
      mensagem: 'Produto removido com sucesso'
    });

  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

module.exports = {
  listarTodos,
  buscarPorNome,
  buscarPorId,
  criar,
  atualizar,
  deletar
};