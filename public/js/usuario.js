document.addEventListener('DOMContentLoaded', function () {
    if (sessionStorage.ID_USUARIO == undefined) {
        window.location = "login.html";
        return;
    }

    spanNomeUsuario.innerHTML = sessionStorage.NOME_USUARIO || "Nome não disponível";
    spanEmailUsuario.innerHTML = sessionStorage.EMAIL_USUARIO || "Email não disponível";
    spanCategoriaUsuario.innerHTML = sessionStorage.CATEGORIA_USUARIO || "Categoria não disponível";
});

function sair() {
    sessionStorage.clear();
    window.location = "login.html";
}
