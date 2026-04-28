const express = require("express");
const cors = require("cors");

const produtosRoutes = require("./routes/produtosRoutes");
const produtosModel = require("./models/produtosModel");

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Arquivos estáticos
app.use(express.static("public"));

// Rotas
app.use("/produtos", produtosRoutes);

// Garantir coluna estoque
produtosModel
  .ensureEstoqueColumn()
  .then(() => {
    console.log("Coluna estoque verificada com sucesso");
  })
  .catch((error) => {
    console.error(
      "Erro ao verificar coluna estoque:",
      error.message
    );
  });

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});