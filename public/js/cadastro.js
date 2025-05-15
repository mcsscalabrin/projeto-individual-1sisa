function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

function finalizarAguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";
}

function cadastrar() {
    aguardar();

    //Recupere o valor da nova input pelo nome do id
    var nomeVar = nome_input.value;
    var categoriaVar = categoria_input.value;
    var emailVar = email_input.value;
    var senhaVar = senha_input.value;
    var confirmacaoSenhaVar = confirmacao_senha_input.value;

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        categoriaVar == "" ||
        emailVar == "" ||
        senhaVar == "" ||
        confirmacaoSenhaVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "Preencha todos os campos para prosseguir!";

        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);
    }

    // Verificando se as senhas batem
    if (senhaVar != confirmacaoSenhaVar) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML = "As senhas inseridas não coincidem!";
        finalizarAguardar();
        return false;
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
