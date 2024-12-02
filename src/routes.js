const { Router } = require("express");
const PratoController = require("./controllers/PratoController");

const routes = Router();
//validar os campos
const validarCamposPrato = (req, res, next) => {
  const { nome, descricao, preco, tipo, imagem } = req.body;
  if (!nome || !descricao || !preco || !tipo || !imagem) {
    return res
      .status(400)
      .json({ error: "O preenchimento de todos os campos obrigatório." });
  }
  next();
};

//lista todos os pratos
routes.get("/cardapio", PratoController.index);
//busca um prato pelo nome
routes.get("/cardapio/:nome", PratoController.show);
//adiciona um novo prato
routes.post("/cardapio", validarCamposPrato, PratoController.store);
//atualiza os dados de um prato pelo nome
routes.put("/cardapio/:nome", validarCamposPrato, PratoController.update);
//remove um prato pelo nome
routes.delete("/cardapio/:nome", PratoController.delete);

module.exports = routes;
