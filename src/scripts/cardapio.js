// Função para buscar todos os pratos e adicionar ao DOM
async function carregarCardapio() {
    try {
        const response = await fetch("/cardapio");  // A rota para obter todos os pratos
        if (!response.ok) {
            throw new Error("Falha ao carregar cardápio");
        }

        const pratos = await response.json(); // Espera que a resposta seja um JSON com os pratos
        const cardapioContainer = document.querySelector(".cardapio"); // Onde os pratos serão inseridos

        // Limpa qualquer conteúdo antigo
        cardapioContainer.innerHTML = "";

        // Para cada prato, cria uma div e insere no container
        pratos.forEach(prato => {
            const divPrato = criarPrato(prato);  // Cria a div do prato
            cardapioContainer.appendChild(divPrato); // Adiciona no DOM
        });
    } catch (error) {
        console.error("Erro ao carregar cardápio:", error);
    }
}

// Função para criar a estrutura de cada prato no HTML
function criarPrato(prato) {
    const divPrato = document.createElement('div');
    divPrato.className = 'page';  // Define a classe para o estilo CSS

    divPrato.innerHTML = `
        <img src="${prato.imagem}" alt="${prato.nome}" style="width: 200px; height: auto; border-radius: 10px;">
        <h3>${prato.nome}</h3>
        <p>${prato.descricao}</p>
        <p>Preço: R$ ${prato.preco}</p>
    `;
    return divPrato;  // Retorna o elemento para ser inserido no DOM
}

// Chama a função para carregar os pratos assim que a página for carregada
document.addEventListener('DOMContentLoaded', carregarCardapio);
