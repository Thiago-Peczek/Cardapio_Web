let pratos = []; // Variável global para armazenar os pratos
let pratosPorPagina = 2; // Defina quantos pratos por página
let paginaAtual = 0; // Página atual

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
    capaFrente.className = "hard";
    capaFrente.innerHTML = "<h1>Cardápio</h1>";
    cardapioDiv.appendChild(capaFrente);

    const capaVerso = document.createElement("div");
    capaVerso.className = "hard";
    cardapioDiv.appendChild(capaVerso);

    // Agrupar pratos por tipo
    const pratosPorTipo = {};
    pratosParaExibir.forEach((prato) => {
        if (!pratosPorTipo[prato.tipo]) {
            pratosPorTipo[prato.tipo] = [];
        }
        pratosPorTipo[prato.tipo].push(prato);
    });

    let totalPaginas = 0;

    Object.keys(pratosPorTipo).forEach((tipo) => {
        // Obter os pratos do tipo
        const pratosParaExibirNaPagina = pratosPorTipo[tipo];
    
        // Verifica se há pratos para exibir
        if (pratosParaExibirNaPagina.length > 0) {
            // Adiciona o título do tipo
            const tituloTipo = document.createElement("h2");
            tituloTipo.textContent = tipo; // Nome do tipo do prato
            console.log("Título do tipo:", tipo); // Verifica se o tipo está correto
            
            // Cria uma nova div para o título com uma classe específica
            const tituloDiv = document.createElement("div");
            tituloDiv.className = "titulo-tipo"; // Classe específica para o título
            tituloDiv.appendChild(tituloTipo);
            
            cardapioDiv.appendChild(tituloDiv); // Adiciona a div do título ao cardápio
    
            // Adiciona os pratos do tipo em pares
            for (let i = 0; i < pratosParaExibirNaPagina.length; i += pratosPorPagina) {
                const paginaPratos = document.createElement("div");
                paginaPratos.className = "page";
    
                // Adiciona até dois pratos por página
                for (let j = 0; j < pratosPorPagina; j++) {
                    if (i + j < pratosParaExibirNaPagina.length) {
                        const pratoDiv = criarPrato(pratosParaExibirNaPagina[i + j]);
                        paginaPratos.appendChild(pratoDiv);
                    }
                }
    
                // Adiciona a página de pratos ao cardápio
                cardapioDiv.appendChild(paginaPratos);
                totalPaginas++; // Incrementa o contador de páginas
            }
        }
        
    });

    
    if (totalPaginas % 2 !== 0) {
        const paginaReserva = document.createElement("div");
        paginaReserva.className = "page"; // Classe para a página reserva
        cardapioDiv.appendChild(paginaReserva); // Adiciona a página reserva
    }
    
    // Adiciona a contracapa
    const contracapaDiv = document.createElement("div");
    contracapaDiv.className = "hard"; // Classe para a contracapa
    contracapaDiv.innerHTML = "<h3>Obrigado por escolher nosso cardápio!</h3><p>Esperamos que você aproveite!</p>";
    cardapioDiv.appendChild(contracapaDiv);

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


async function handleDelete() {
    const pratoNome = document.getElementById('prato').value.trim();
    if (!pratoNome) {
        alert("Por favor, insira o nome do prato a ser deletado.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/cardapio/${pratoNome}`, {
            method: 'DELETE',
        });

        if (response.status === 204) {
            alert("Prato deletado com sucesso!");
            carregarCardapio(); // Atualiza o cardápio
        } else {
            const error = await response.json();
            alert(`Erro: ${error.error}`);
        }
    } catch (error) {
        console.error("Erro ao deletar o prato:", error);
        alert("Não foi possível excluir o prato. Tente novamente mais tarde.");
    }
}