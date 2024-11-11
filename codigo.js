const urlBase = "https://botafogo-atletas.mange.li/2024-1/";

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const container = document.getElementById("container");

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

// Função para carregar dados com base no filtro selecionado
const carregarDados = (filtro) => {
    container.innerHTML = ""; // Limpa os cards existentes
    pega_json(`${urlBase}${filtro}`).then((r) => {
        r.forEach((ele) => container.appendChild(montaCard(ele)));
    });
};

// Carrega o filtro 'masculino' por padrão ao abrir a página
carregarDados('masculino');

// Verificar login e redirecionar se não estiver logado
if (!sessionStorage.getItem('logado') && window.location.pathname.includes("home.html")) {
    window.location.href = "index.html";
}

const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === '5029cc9dd0295ded2f500084635c18c1') {
        sessionStorage.setItem('logado', 'sim');
        window.location.href = "home.html";
    } else {
        alert('Você errou a senha');
    }
};

// Função de logout para limpar o sessionStorage
document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');
    window.location.href = "index.html";
};