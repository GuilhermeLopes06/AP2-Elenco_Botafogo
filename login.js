const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === '67dc411435f0b276521abd207cfa2b41') {
        sessionStorage.setItem('logado', 'sim');
        window.location.href = "home.html";
    } else {
        alert('Você errou a senha');
    }
};

document.getElementById('botao').onclick = manipulaBotao;




if (sessionStorage.getItem('logado')) {
    window.location.href = "home.html";
}
