const PratoRepository = require ("../repositories/PratoRepository")

class PratoController {
  async index(request, response) {
    // Listar todos os registros
    const prato = await PratoRepository.getAllPratos();
    response.json(prato);
  }

  async typeindex(request, response) {
    try {
        const tipos = await PratoRepository.getTipo();
        response.json(tipos);
    } catch (error) {
        console.error("Erro ao buscar tipos:", error.message);
        response.status(500).json({ error: "Erro ao buscar tipos" });
    }
  }

  async show(request, response) {
    // Obter um registro
    const { nome } = request.params;

    const prato = await PratoRepository.getPratoByNome(nome);
    //Verificando se o nome enviado na requisição pertence ao cardapio
    if (!prato) {
      return response.status(404).json({ error: "Nome não encontrado" });
    }
    response.json(prato);
  }

  async store(request, response) {
    const { nome, descricao, preco, tipo, imagem } = request.body;
    // Definindo regra de que o preenchimento de todos os campos é obrigatório

    if (!nome || !descricao || !preco || !tipo || !imagem) {
        return response.status(400).json
        ({ error: "O preenchimento de todos os campos são obrigatórios." })
    }
    //Definindo que o nome deve ser único para cada prato e obrigatório
    if (nome) {
      const pratoByNome = await PratoRepository.findByNome(nome);
      if (pratoByNome) {
          return response.status(400).json
          ({ error: "Esse prato já foi cadastrado." });
      }
  }
        //criando o prato gerado no banco de dados
    const prato = await PratoRepository.create({
      nome,
      descricao,
      preco,
      tipo,
      imagem,
    });
       //respondendo com o prato criado
    response.status(201).json(prato);
  }

  async update(request,response) {
    // atualizar um prato ja existente
    const { nome } = request.params;
    const { descricao, preco, tipo, imagem } = request.body;
  
    // verificando se todos os campos estão preenchidos
    if (!descricao || !preco || !tipo || !imagem) {
      return response.status(400).json({ error: "O preenchimento de todos os campos é obrigatório" });
    }
  
    // verificando se o prato a ser atualizado existe
    const prato = await PratoRepository.findByNome(nome);
    if (!prato) {
      return response.status(404).json({ error: "Prato não encontrado" });
    }
  
    // atualizando o prato
    const updatedPrato = await PratoRepository.update(nome, { descricao, preco, tipo, imagem });
  
    response.json(updatedPrato);
  }
  

  async delete(request, response) {
    const { nome } = request.params;

    if (!nome) {
        return response.status(400).json({ error: "Nome inválido." });
    }

    try {
        await PratoRepository.delete(nome);
        response.sendStatus(204); // Sucesso
    } catch (error) {
        response.status(404).json({ error: error.message });
    }
  } 
}
module.exports = new PratoController();
