const urlBase = "https://botafogo-atletas.mange.li/2024-1/";

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const container = document.getElementById("container");
const campoPesquisa = document.getElementById('campoPesquisa');

let filtroAtuais = ''; 
let dadosAtuais = {}; 
let carregando = false; 

campoPesquisa.addEventListener('input', () => {
    carregarDados(filtroAtuais);  
});

document.getElementById('selecionaGenero').addEventListener('change', (event) => {
    const filtro = event.target.value;
    carregarDados(filtro);
});


const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    document.cookie = `id=${id}`;
    localStorage.setItem('id', id);
    localStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));
    sessionStorage.setItem('dados', JSON.stringify(e.currentTarget.dataset));

    window.location = url;
};

const montaCard = (atleta) => {
    const cartao = document.createElement('article');
    const nome = document.createElement("h1");
    const imagem = document.createElement("img");
    const descri = document.createElement("p");

    nome.innerHTML = atleta.nome;
    cartao.appendChild(nome);

    imagem.src = atleta.imagem;
    cartao.appendChild(imagem);

    descri.innerHTML = atleta.detalhes;
    cartao.appendChild(descri);

    
    cartao.onclick = manipulaClick;

    cartao.dataset.id = atleta.id;
    cartao.dataset.nJogos = atleta.n_jogos;
    cartao.dataset.altura = atleta.altura;

    return cartao;
};

const carregarDados = (filtro) => {
    if (carregando) return; 

    
    container.innerHTML = ""; 

    const textoPesquisa = campoPesquisa.value.toLowerCase();

   
    if (dadosAtuais[filtro]) {
       
        const dadosFiltrados = dadosAtuais[filtro].filter((atleta) =>
            atleta.nome.toLowerCase().includes(textoPesquisa)
        );
        
       
        dadosFiltrados.forEach((atleta) => {
            container.appendChild(montaCard(atleta));
        });
    } else {
       
        carregando = true; 

        pega_json(`${urlBase}${filtro}`).then((r) => {
            
            dadosAtuais[filtro] = r;

            
            const dadosFiltrados = r.filter((atleta) =>
                atleta.nome.toLowerCase().includes(textoPesquisa)  
            );
            
            
            dadosFiltrados.forEach((atleta) => {
                container.appendChild(montaCard(atleta));
            });

            carregando = false; 
        }).catch((err) => {
            console.error("Erro ao carregar dados:", err);
            carregando = false; 
        });
    }
};


document.querySelectorAll('#filtros button').forEach(button => {
    button.addEventListener('click', () => {
        
        const filtro = button.textContent.toLowerCase();

        
        filtroAtuais = filtro === 'todos' ? 'all' : filtro;

      
        carregarDados(filtroAtuais); 
    });
});


document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');
    window.location.href = "index.html";
};


