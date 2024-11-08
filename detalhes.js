const url = "https://botafogo-atletas.mange.li/2024-1/";
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const pega_json = async(caminho) => {
    const resposta = await fetch (caminho);
    const dados = await resposta.json();
    return dados;
}

const montaPagina = (dados) => {
    const body = document.body;

    const nome = document.createElement('h1');
    nome.innerHTML = dados.nome;
    body.appendChild(nome);

    const imagem = document.createElement('img');
    imagem.src = dados.imagem;
    body.appendChild(imagem);

    const lista_detalhes = document.createElement('ul')
    
    const n_jogos = document.createElement('li');
    n_jogos.innerHTML = dados.n_jogos
    lista_detalhes.appendChild(n_jogos)

    const posicao = document.createElement('li');
    posicao.innerHTML = dados.posicao
    lista_detalhes.appendChild(posicao)

    body.appendChild(lista_detalhes);
}

if (sessionStorage.getItem('logado')){




const body = document.body; 
pega_json(`https://botafogo-atletas.mange.li/2024-1/${id}`).then(
    (r) => montaPagina(r)
)} else {
    document.body.innerHTML = "<h1>Você precisa estar logado para acessar esse conteúdo</h1>"
}



const achaCookie = (chave) => {
    const lista = document.cookie.split("; ");
    const par = lista.find (
        (e) => e.startsWith(`${chave}=`)
    )

    return par.split("=")[1]
}


const dadosSessionStorage = sessionStorage.getItem('dados'); 

const obj = JSON.parse(dadosSessionStorage);

console.log('número de jogos:', obj.nJogos);