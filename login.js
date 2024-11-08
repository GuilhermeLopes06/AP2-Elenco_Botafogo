const manipulaBotao = () => {
    const texto = document.getElementById('senha').value;
    if (hex_md5(texto) === '5029cc9dd0295ded2f500084635c18c1') {
        sessionStorage.setItem('logado', 'sim');
        window.location.href = "home.html"; // Redireciona para home.html após login bem-sucedido
    } else {
        alert('Você errou a senha');
    }
};

document.getElementById('botao').onclick = manipulaBotao;

// Opcional: Logout para limpar o sessionStorage
document.getElementById('logout').onclick = () => sessionStorage.removeItem('logado');

// Verifica se o usuário já está logado
if (sessionStorage.getItem('logado')) {
    window.location.href = "home.html"; // Redireciona para home.html se já estiver logado
}
