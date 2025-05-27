function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";
}

// Função de validação implementada
function validarCadastro(nome, categoria, email, senha) {
    var validado = true;

    if (nome == "" || email == "" || senha == "" || categoria == "") {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "Por favor, preencha todos os campos obrigatórios.";
        validado = false;
    } else if (email.indexOf('@') == -1 || email.indexOf('.') == -1 ||
                email.indexOf('@') > email.lastIndexOf('.') ||
                email.indexOf('@') == 0 ||
                email.lastIndexOf('.') == email.length - 1) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "Este endereço de email não é válido.";
        validado = false;
    } else if (senha.length < 6) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "A senha deve ter pelo menos 6 caracteres.";
        validado = false;
    }

    return validado;
}

function cadastrar() {
    aguardar();

    var nomeVar = nome_input.value;
    var categoriaVar = categoria_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    if (!validarCadastro(nomeVar, categoriaVar, emailVar, senhaVar)) {
        finalizarAguardar();
        return false;
    }

    if (senhaVar != confirmacaoSenhaVar) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "As senhas inseridas não coincidem!";
        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }

    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            categoriaServer: categoriaVar,
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
            cardErro.style.display = "block";
            mensagem_erro.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";

            setTimeout(() => {
                window.location = "landing-page.html";
            }, "2000");

            limparFormulario();
            finalizarAguardar();
        } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
        finalizarAguardar();
    });

    return false;
}

function limparFormulario() {
    document.getElementById("nome_input").value = "";
    document.getElementById("categoria_input").value = "";
    document.getElementById("email_input").value = "";
    document.getElementById("senha_input").value = "";
    document.getElementById("confirmacao_senha_input").value = "";
}

function sumirMensagem() {
    cardErro.style.display = "none";
}
