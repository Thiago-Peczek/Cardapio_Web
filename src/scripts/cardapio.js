// Função para buscar todos os pratos e adicionar ao DOM
/*async function carregarCardapio() {
    try {
        const response = await fetch("http://localhost:3000/cardapio");  // A rota para obter todos os pratos
        if (!response.ok) {
            throw new Error("Falha ao carregar cardápio");
        }

        const pratos = await response.json(); // Espera que a resposta seja um JSON com os pratos
        const cardapioContainer = document.querySelector(".cardapio"); // Onde os pratos serão inseridos

        // Seleciona todas as divs com a classe hard
        const hardDivs = cardapioContainer.querySelectorAll(".hard");
        console.log("Número de divs hard:", hardDivs.length); // Verifica a quantidade de divs hard

        // Para cada prato, cria uma div e insere no container
        pratos.forEach(prato => {
            const divPrato = criarPrato(prato);  // Cria a div do prato
            // Insere a nova div do prato no final do container
            cardapioContainer.appendChild(divPrato);
        });
        
    } catch (error) {
        console.error("Erro ao carregar cardápio:", error);
    }
}*/

// Função para criar a estrutura de cada prato no HTML

function criarPrato(prato) {
    const divPrato = document.createElement('div');
    divPrato.className = 'page'; // Adiciona uma classe para estilização, se necessário

    divPrato.innerHTML = `
        <img src="${prato.imagem}" alt="${prato.nome}" style="width: 200px; height: auto; border-radius: 10px;">
        <h3>${prato.nome}</h3>
        <p>${prato.descricao}</p>
        <p>Preço: R$ ${prato.preco}</p>
    `;

    return divPrato;  // Retorna o elemento para ser inserido no DOM
}

//função do chatgpt
async function carregarCardapio() {
    try {
        const response = await fetch("http://localhost:3000/cardapio"); // Rota para obter os pratos
        if (!response.ok) {
            throw new Error("Falha ao carregar cardápio");
        }

        const pratos = await response.json(); // Dados do cardápio
        const paginaAlvo = document.querySelector('.page-wrapper[page="3"]'); // Exemplo: seleciona a página 3

        if (!paginaAlvo) {
            throw new Error("Página alvo não encontrada");
        }

        const conteudoPagina = paginaAlvo.querySelector('.hard.page.p3.odd');

        pratos.forEach(prato => {
            const divPrato = criarPrato(prato); // Criação da div do prato
            conteudoPagina.appendChild(divPrato); // Insere dentro da página específica
        });

    } catch (error) {
        console.error("Erro ao carregar cardápio:", error);
    }
}




// Função para a Janela de POST ou PUT
function abrirModal(a){
    const modal = document.getElementById('janelaCadastro')
    const btntxt = document.getElementById('btn')
    const title = document.getElementById('titulo')
    modal.classList.add('abrir')//adiciona uma classe chama abrir
    if(a==0){
        btntxt.innerHTML = 'Criar';
        btntxt.id='create'
        title.innerHTML = 'Adicionar prato';
    }else{
        btntxt.innerHTML = 'Atualizar';
        btntxt.id='update'
        title.innerHTML = 'Atualizar prato';
    }

    modal.addEventListener('click', (e) => {
        if(e.target.id == 'fechar' || e.target.id == 'janelaCadastro'){ //caso clique em fechar ou fora da tela
            modal.classList.remove('abrir')//remove a classe abrir
            btntxt.id='btn';
        }
    })
}

// Chama a função para carregar os pratos assim que a página for carregada
document.addEventListener('DOMContentLoaded', carregarCardapio);


const inputFile = document.querySelector("#image");
const pictureImage = document.querySelector(".picture_image");
const pictureImageTxt = 'Escolha uma imagem';
pictureImage.innerHTML = pictureImageTxt;

//Ao adicinar um arquivo no inputFile mostra a imagem
inputFile.addEventListener('change', function(e) { 
    const inputTarget = e.target;
    const file = inputTarget.files[0];

    if (file){
        const reader = new FileReader();

        reader.addEventListener('load', function(e) {
            const readerTarget = e.target;

            const img = document.createElement('img');
            img.src = readerTarget.result;
            img.classList.add('picture_img');
            pictureImage.innerHTML = '';

            pictureImage.appendChild(img);
        });

        reader.readAsDataURL(file);
    }else {
        pictureImage.innerHTML = pictureImageTxt;
    }
    
});
