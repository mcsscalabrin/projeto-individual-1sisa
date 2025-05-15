document.addEventListener('DOMContentLoaded', function () {
    // Verificando se o usuário está logado
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location = "login.html";
        return;
    }

    // Dados do usuário do sessionStorage
    spanNomeUsuario.innerHTML = sessionStorage.NOME_USUARIO || "Nome não disponível";
    spanEmailUsuario.innerHTML = sessionStorage.EMAIL_USUARIO || "Email não disponível";
    spanCategoriaUsuario.innerHTML = sessionStorage.CATEGORIA_USUARIO || "Categoria não disponível";
});

function sair() {
    sessionStorage.clear();
    window.location = "landing-page.html";
}
