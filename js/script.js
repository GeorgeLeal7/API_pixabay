"use stritic";
const limparElementos = elemento =>{
    while(elemento.firstChild){
        elemento.removeChild(elemento.lastChild);
    }
}

//Buscando as imagens da API
const pesquisarImagens = async(evento) =>{
    if(evento.key == "Enter"){

        //Tipo de imagem (seria o filtro para outros tipos de imagem)
        const typeImage = document.querySelector(".categorias").value;

        //API Key do usuário
        const apiKey = "23670717-85b5103b3d880933d4e67c566";

        //Buscando a imagem através do link
        const pesquisa = evento.target.value;
        const url = `https://pixabay.com/api/?key=${apiKey}&q=${pesquisa}&image_type=${typeImage}`;
        
        const responsive = await fetch(url);
        const imgs = await responsive.json();
        console.log(imgs);

        //Processo de limpeza
        limparElementos(document.querySelector("#container-galeria"));
        limparElementos(document.querySelector(".status"));

        //Caregando a Galeria e o Status
        carregarGaleria(imgs.hits);
        carregarStatus(imgs,pesquisa);
    } 
}

//Criando um container para as imagens da API aparecerem na Tela 
const criarItem = item =>{

    if(item.userImageURL == ""){
        item.userImageURL = "img/user.png"
    } 


    const container = document.querySelector("#container-galeria");
    const divCard =document.createElement("div");
    const tags = item.tags.replace(/,+/g, '');

    //Campo HTML para a estrutura e personalização no campo das imagens
    divCard.innerHTML = `
                <a class="perfil" href="https://pixabay.com/users/${item.user}-${item.user_id}/">
                    <img class="perfil" src="${item.userImageURL}">
                </a>
                <div class="options">
                    <div class="info">${tags}</div>
                    <div class="linhas">
                        <div class="itens-img"><img src="img/curtida.png">${item.likes}</div>
                        <div class="itens-img"><img src="img/comentario.png">${item.comments}</div>
                        <div class="itens-img"><img src="img/bandeira.png"></div>
                    </div>
                </div>
                <a class="card" href="${item.pageURL}">
                    <img class="card" src="${item.webformatURL}">
                </a>
            `;
    container.appendChild(divCard);
}

//Caregando Status da Pesquisa
const carregarStatus = (status,pesquisa) =>{
    const container = document.querySelector(".status");
    const novoStatus = document.createElement("p");
    novoStatus.classList = ".textPadrao";
    novoStatus.innerHTML = `${status.totalHits} free pictures to ${pesquisa}`;
    container.appendChild(novoStatus);
}

//Carregando a galeria de imagens
const carregarGaleria = imgs => imgs.forEach(criarItem);

//Eventos da Pesquisa e do Filtro
document.querySelector("#pesquisa").addEventListener("keypress", pesquisarImagens);
document.querySelector(".categorias").addEventListener("selected", pesquisarImagens);