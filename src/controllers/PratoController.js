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

    // Verificando se todos os campos obrigatórios foram preenchidos
    if (!nome || !descricao || !preco || !tipo || !imagem) {
        return response.status(400).json({ error: "O preenchimento de todos os campos é obrigatório." });
    }

    // Verificando se o nome do prato já existe
    const pratoByNome = await PratoRepository.getPratoByNome(nome);
    if (pratoByNome) {
        return response.status(400).json({ error: "Esse prato já foi cadastrado." });
    }

    // Criando o prato no banco de dados
    const prato = await PratoRepository.create({
        nome,
        descricao,
        preco,
        tipo,
        imagem,
    });

    // Respondendo com o prato criado
    return response.status(201).json(prato);
  }

  async update(request, response) {
    const { nome } = request.params; // Nome do prato enviado pela rota
    const { nome: novoNome, descricao, preco, tipo, imagem } = request.body;

    if (!nome || !novoNome || !descricao || !preco || !tipo || !imagem) {
        return response.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    try {
        const success = await PratoRepository.updatePrato(nome, novoNome, descricao, preco, tipo, imagem);

        if (success) {
            response.status(200).json({ message: 'Prato atualizado com sucesso!' });
        } else {
            response.status(404).json({ error: 'Prato não encontrado.' });
        }
    } catch (error) {
        console.error('Erro ao atualizar prato:', error);
        response.status(500).json({ error: 'Erro ao atualizar prato.' });
    }
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
