const url = "https://botafogo-atletas.mange.li/2024-1/";

const pega_json = async (caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
};

const container = document.getElementById("container");

const manipulaClick = (e) => {
    const id = e.currentTarget.dataset.id;
    const url = `detalhes.html?id=${id}`;

    // Armazenar em cookie, localStorage e sessionStorage
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

// Carregar os dados dos atletas e exibir os cards
pega_json(`${url}masculino`).then((r) => {
    r.forEach((ele) => container.appendChild(montaCard(ele)));
});

// Função para verificar login e redirecionar se não estiver logado
if (!sessionStorage.getItem('logado') && window.location.pathname.includes("home.html")) {
    window.location.href = "index.html"; // Redireciona para a página de login se não estiver logado
}

const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === '5029cc9dd0295ded2f500084635c18c1') {
        sessionStorage.setItem('logado', 'sim');
        window.location.href = "home.html"; // Redireciona para a página home após login bem-sucedido
    } else {
        alert('Você errou a senha');
    }
};



// Função de logout para limpar o sessionStorage
document.getElementById('logout').onclick = () => {
    sessionStorage.removeItem('logado');  // Remove a flag de login
    window.location.href = "index.html";   // Redireciona para a página de login
};

