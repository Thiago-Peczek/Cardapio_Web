const express = require("express");
const cors = require("cors");  // Importe o pacote CORS
const db = require("./models/ConnectDatabase");
const routes = require("./routes");
const app = express();
const port = 3000;

// Testa a conexão com o banco de dados
db.testConnection().catch((err) => {
  console.error(
    "Não foi possível conectar ao banco de dados. Encerrando o aplicativo."
  );
  process.exit(1);
});

// Permite requisições de qualquer origem (pode ser mais restritivo em produção)
app.use(cors());  // Isso habilita CORS para todas as rotas

app.use(express.json());

// Usa as rotas
app.use(routes);

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em: http://localhost:${port}`);
});
