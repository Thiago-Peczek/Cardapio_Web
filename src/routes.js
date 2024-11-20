const { Router } = require("express");
const PratoController = require("./controllers/PratoController");

const routes = Router();

routes.get("/cardapio", PratoController.index);
routes.get("/cardapio/:nome", PratoController.show);
routes.post("/cardapio", PratoController.store);
routes.put("/contacts/:nome", PratoController.update);
routes.delete("/contacts/:name", PratoController.delete);

module.exports = routes;