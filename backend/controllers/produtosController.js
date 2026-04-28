const ProdutoModel = require('../models/produtosModel');

async function listarTodos(req, res) {
  try {
    const produtos = await ProdutoModel.listarTodos();
    res.status(200).json(produtos);
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao listar', erro: erro.message });
  }
}

async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const produto = await ProdutoModel.buscarPorId(id);
    if (!produto) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.status(200).json(produto);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function buscarPorNome(req, res) {
  try {
    const { nome } = req.params;
    const produtos = await ProdutoModel.buscarPorNome(nome);
    
    if (produtos && produtos.length > 0) {
      res.status(200).json(produtos);
    } else {
      res.status(404).json({ mensagem: `Nenhum produto encontrado com o nome: ${nome}` });
    }
  } catch (erro) {
    res.status(500).json({ mensagem: 'Erro ao buscar por nome', erro: erro.message });
  }
}







async function criar(req, res) {
  try {
    const { nomep, categoria, preco, estoque } = req.body;

    if (!nomep || !categoria || !preco || !estoque) {
      return res.status(400).json({ mensagem: 'Os campos nomep, categoria, preco e estoque são obrigatórios' });
    }

    const novo = await ProdutoModel.criar({ nomep, categoria, preco, estoque });
    res.status(201).json(novo);
  } catch (erro) {
    console.error('Erro SQL ao criar produto:', erro.message);
    if (erro.code === '23505') return res.status(409).json({ mensagem: 'Produto já cadastrado' });
    res.status(500).json({ mensagem: 'Erro ao criar', erro: erro.message });
  }
}

async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const atualizado = await ProdutoModel.atualizar(id, req.body);
    if (!atualizado) return res.status(404).json({ mensagem: 'Produto não encontrado para atualizar' });
    res.status(200).json(atualizado);
  } catch (erro) {
    res.status(500).json({ erro: erro.message });
  }
}

async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const deletado = await ProdutoModel.deletar(id);
    if (!deletado) return res.status(404).json({ mensagem: 'Produto não encontrado' });
    res.status(200).json({ mensagem: 'Removido com sucesso' });
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