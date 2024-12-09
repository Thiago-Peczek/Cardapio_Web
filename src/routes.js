const { Router } = require("express");
const PratoController = require("./controllers/PratoController");

const routes = Router();

// Lista todos os pratos
routes.get("/cardapio", PratoController.index);
// Busca um prato pelo nome
routes.get("/cardapio/:nome", PratoController.show);
// Adiciona um novo prato
routes.post("/cardapio", PratoController.store);
// Atualiza os dados de um prato pelo nome
routes.put("/cardapio/:nome", PratoController.update)
// Remove um prato pelo nome
routes.delete("/cardapio/:nome", PratoController.delete);

module.exports = routes;