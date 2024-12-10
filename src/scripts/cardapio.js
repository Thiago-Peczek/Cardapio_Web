let pratos = []; // Variável global para armazenar os pratos

async function carregarCardapio() {
    try {
        const response = await fetch("http://localhost:3000/cardapio");
        if (!response.ok) throw new Error("Erro ao carregar o cardápio");

        pratos = await response.json(); // Armazena os pratos na variável global
        exibirCardapio(pratos); // Exibe os pratos inicialmente

        console.log("Cardápio carregado com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar o cardápio:", error);
    }
}

function exibirCardapio(pratosParaExibir) {
    const cardapioDiv = document.querySelector(".cardapio");
    cardapioDiv.innerHTML = ""; // Limpa as páginas existentes.

    // CAPA INICIAL (Frente e Verso)
    const capaFrente = document.createElement("div");
    capaFrente.className = "hard page shadow";
    capaFrente.innerHTML = "<h1>Cardápio</h1>";
    cardapioDiv.appendChild(capaFrente);

    const capaVerso = document.createElement("div");
    capaVerso.className = "hard page shadow";
    cardapioDiv.appendChild(capaVerso);

    // Agrupar pratos por tipo
    const pratosPorTipo = {};
    pratosParaExibir.forEach((prato) => {
        if (!pratosPorTipo[prato.tipo]) {
            pratosPorTipo[prato.tipo] = [];
        }
        pratosPorTipo[prato.tipo].push(prato);
    });

    // Adiciona as páginas agrupadas por tipo de prato
    Object.keys(pratosPorTipo).forEach((tipo) => {
        // Cria uma nova página para cada tipo
        const paginaTipo = document.createElement("div");
        paginaTipo.className = "page shadow";

        // Adiciona o título do tipo
        const tituloTipo = document.createElement("h2");
        tituloTipo.textContent = tipo; // Nome do tipo do prato
        paginaTipo.appendChild(tituloTipo);

        // Adiciona os pratos do tipo
        pratosPorTipo[tipo].forEach((prato) => {
            const pratoDiv = criarPrato(prato);
            paginaTipo.appendChild(pratoDiv);
        });

        cardapioDiv.appendChild(paginaTipo);
    });

    const contracapaVerso = document.createElement("div");
    contracapaVerso.className = "hard page";
    cardapioDiv.appendChild(contracapaVerso);

    // Adiciona contracapa (frente e verso)
    const contracapaFrente = document.createElement("div");
    contracapaFrente.className = "hard";
    contracapaFrente.innerHTML = `
        <div>
            Feito por <br><small>~ Henrique Meneses<br>~ Paulo Roberto<br>~ Thiago Tanaka</small>
        </div>`;
    cardapioDiv.appendChild(contracapaFrente);

    // Inicializa o Turn.js
    $(".cardapio").turn({
        width: "60dvw", // Tamanho definido no CSS.
        height: "80dvh", // Altura definida no CSS.
        autoCenter: true,
    });
}

function criarPrato(prato) {
    const divPrato = document.createElement('div');
    divPrato.className = 'prato'; // Adiciona a classe 'prato'

    // Define o conteúdo HTML do prato
    divPrato.innerHTML = `
        <div class="prato-header">
            <h2 class="prato-nome">${prato.nome}</h2>
            <span class="prato-preco">R$ ${parseFloat(prato.preco).toFixed(2)}</span>
        </div>
        <div class="prato-content">
            <img src="${prato.imagem}" alt="${prato.nome}" class="prato-imagem">
            <p class="prato-descricao">${prato.descricao}</p>
        </div>
    `;

    return divPrato; // Retorna o elemento criado
}


// Função para filtrar pratos
function filtrarPratos() {
    const input = document.getElementById("prato").value.toLowerCase();
    const pratosFiltrados = pratos.filter(prato => prato.nome.toLowerCase().includes(input));
    exibirCardapio(pratosFiltrados); // Atualiza a exibição com os pratos filtrados
}

// Adiciona o evento de input ao campo de texto
document.getElementById("prato").addEventListener("input", filtrarPratos);

// Carrega os pratos ao iniciar
carregarCardapio();


async function carregarTipos() {
    try {
        const response = await fetch("http://localhost:3000/tipo");
        if (!response.ok) throw new Error("Erro ao carregar tipos");

        const tipos = await response.json();
        const tiposSelect = document.getElementById("tipos");
        tiposSelect.innerHTML = ""; // Limpa as opções existentes

        tipos.forEach(tipo => {
            const option = document.createElement("option");
            option.value = tipo.idTipo; // O valor que será utilizado
            option.textContent = tipo.nome; // O nome do tipo que será exibido
            tiposSelect.appendChild(option);
        });

        console.log("Tipos carregados com sucesso.");
    } catch (error) {
        console.error("Erro ao carregar tipos:", error);
    }
}


// Função para a Janela de POST ou PUT
function abrirModal(a){
    const modal = document.getElementById('janelaCadastro')
    const btntxt = document.getElementById('btn')
    const title = document.getElementById('titulo')
    modal.classList.add('abrir')//adiciona uma classe chama abrir

    // Carregar tipos de pratos
    carregarTipos();

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
