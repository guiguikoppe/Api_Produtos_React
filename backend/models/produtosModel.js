const pool = require('../config/database');

// LISTAR TODOS
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM Produtos ORDER BY idp'
  );
  return result.rows;
}

// BUSCAR POR ID
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM Produtos WHERE idp = $1',
    [id]
  );
  return result.rows[0];
}

// BUSCAR POR NOME
async function buscarPorNome(nome) {
  const query = 'SELECT * FROM Produtos WHERE nomep ILIKE $1';
  const values = [`%${nome}%`];
  const { rows } = await pool.query(query, values);
  return rows;
}

// CRIAR
async function criar(dados) {
  const { nomep, categoria, preco, estoque } = dados;

  const sql = `
    INSERT INTO Produtos (nomep, categoria, preco, estoque)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;

  const result = await pool.query(sql, [
    nomep,
    categoria,
    preco,
    estoque
  ]);

  return result.rows[0];
}

// ATUALIZAR (DINÂMICO - CORRETO)
async function atualizar(id, dados) {
  const { nomep, categoria, preco, estoque } = dados;

  let campos = [];
  let valores = [];
  let index = 1;

  if (nomep !== undefined) {
    campos.push(`nomep = $${index++}`);
    valores.push(nomep);
  }

  if (categoria !== undefined) {
    campos.push(`categoria = $${index++}`);
    valores.push(categoria);
  }

  if (preco !== undefined) {
    campos.push(`preco = $${index++}`);
    valores.push(preco);
  }

  if (estoque !== undefined) {
    campos.push(`estoque = $${index++}`);
    valores.push(estoque);
  }

  if (campos.length === 0) return null;

  valores.push(id);

  const sql = `
    UPDATE Produtos
    SET ${campos.join(', ')}
    WHERE idp = $${index}
    RETURNING *
  `;

  const result = await pool.query(sql, valores);
  return result.rows[0] || null;
}

// DELETAR
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM Produtos WHERE idp = $1',
    [id]
  );

  return result.rowCount > 0;
}

// ESTOQUE (UTIL)
async function ensureEstoqueColumn() {
  await pool.query(
    'ALTER TABLE Produtos ADD COLUMN IF NOT EXISTS estoque VARCHAR'
  );
}

module.exports = {
  listarTodos,
  buscarPorId,
  buscarPorNome,
  criar,
  atualizar,
  deletar,
  ensureEstoqueColumn
};