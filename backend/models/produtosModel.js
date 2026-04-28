const pool = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todos os Produtos do banco
// ============================================================
async function listarTodos() {
  const result = await pool.query(
    'SELECT * FROM Produtos ORDER BY idp'
  );
  return result.rows;
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca um produto específico pelo IDP
// ============================================================
async function buscarPorId(id) {
  const result = await pool.query(
    'SELECT * FROM Produtos WHERE idp = $1',
    [id]
  );
  return result.rows[0];
}

async function buscarPorNome(nome) {
  try {
    const query = 'SELECT * FROM Produtos WHERE nomep ILIKE $1';
    const values = [`%${nome}%`];
    const { rows } = await pool.query(query, values);
    return rows;
  } catch (erro) {
    throw erro;
  }
}



// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere um novo produto
// ============================================================
async function criar(dados) {
  const {
    nomep,
    categoria,
    preco,
    estoque
  } = dados;
  
  const sql = `
    INSERT INTO Produtos (nomep, categoria, preco, estoque)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  
  const result = await pool.query(
    sql,
    [nomep, categoria, preco, estoque]
  );
  
  return result.rows[0];
}

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza os dados de um produto dinamicamente
// ============================================================
async function atualizar(id, dados) {
  const {
    nomep,
    categoria,
    preco,
    estoque
  } = dados;
  
  let campos = [];
  let valores = [];
  let contador = 1;
  
  if (nomep !== undefined) {
    campos.push(`nomep = $${contador++}`);
    valores.push(nomep);
  }
  if (categoria !== undefined) {
    campos.push(`categoria = $${contador++}`);
    valores.push(categoria);
  }
  if (preco !== undefined) {
    campos.push(`preco = $${contador++}`);
    valores.push(preco);
  }
  if (estoque !== undefined) {
    campos.push(`estoque = $${contador++}`);
    valores.push(estoque);
  }
  
  if (campos.length === 0) return null;
  
  valores.push(id);
  
  const sql = `
    UPDATE Produtos
    SET ${campos.join(', ')}
    WHERE idp = $${contador}
    RETURNING *
  `;
  
  const result = await pool.query(sql, valores);
  return result.rows[0] || null;
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove um produto do banco
// ============================================================
async function deletar(id) {
  const result = await pool.query(
    'DELETE FROM Produtos WHERE idp = $1',
    [id]
  );
  
  return result.rowCount > 0;
}



// ============================================================
// FUNÇÃO: garantir coluna estoque
// ============================================================
async function ensureEstoqueColumn() {
  const sql = `ALTER TABLE Produtos ADD COLUMN IF NOT EXISTS estoque VARCHAR`;
  await pool.query(sql);
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