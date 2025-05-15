const listaDeQuestoes = [

    {
        pergunta: "Qual país é considerado o berço do Beach Tennis?",
        alternativaA: "Brasil",
        alternativaB: "Estados Unidos",
        alternativaC: "Itália",
        alternativaD: "França",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Qual a dimensão oficial de uma quadra de Beach Tennis para duplas?",
        alternativaA: "12m x 6m",
        alternativaB: "10m x 5m",
        alternativaC: "18m x 9m",
        alternativaD: "16m x 8m",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Como é feita a pontuação no Beach Tennis?",
        alternativaA: "15, 30, 40, game",
        alternativaB: "1, 2, 3, set",
        alternativaC: "Pontos diretos (1 a 21)",
        alternativaD: "Sistema de rally point",
        alternativaCorreta: "alternativaA"
    },

    {
        pergunta: "Qual a altura oficial da rede?",
        alternativaA: "1,5m",
        alternativaB: "1,7m",
        alternativaC: "1,8m",
        alternativaD: "2,0m",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Qual material é usado nas raquetes profissionais de Beach Tennis?",
        alternativaA: "Madeira",
        alternativaB: "Alumínio",
        alternativaC: "Fibra de Carbono",
        alternativaD: "Plástico",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Qual regra NÃO existe no Beach Tennis?",
        alternativaA: "Proibição de tocar na rede",
        alternativaB: "Bola fora nas linhas",
        alternativaC: "Let (repetir o saque ao bater na rede e passar para o outro lado)",
        alternativaD: "A bola não pode pingar no chão",
        alternativaCorreta: "alternativaC"
    },

    {
        pergunta: "Qual desses é o brasileiro com a posição mais alta no ranking ITF Masculino?",
        alternativaA: "Vini Font",
        alternativaB: "Daniel Mola",
        alternativaC: "Alan Oliveira",
        alternativaD: "André Baran",
        alternativaCorreta: "alternativaD"
    },

    {
        pergunta: "Qual destes é um torneio famoso de beach tennis?",
        alternativaA: "Wimbledon",
        alternativaB: "Sand Series",
        alternativaC: "US Open",
        alternativaD: "Roland Garros",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Quantos sets são disputados em uma partida profissional de beach tennis?",
        alternativaA: "1 set",
        alternativaB: "2 sets",
        alternativaC: "3 sets",
        alternativaD: "5 sets",
        alternativaCorreta: "alternativaB"
    },

    {
        pergunta: "Qual dessas brasileiras possui o posicionamento mais alto no ranking ITF Feminino?",
        alternativaA: "Rafaella Miiller",
        alternativaB: "Sophia Show",
        alternativaC: "Vitoria Marchezini",
        alternativaD: "Marcela Vita",
        alternativaCorreta: "alternativaA"
    },
]

// variáveis globais
let numeroDaQuestaoAtual = 0
let pontuacaoFinal = 0
let tentativaIncorreta = 0
let certas = 0
let erradas = 0
let quantidadeDeQuestoes = listaDeQuestoes.length
// let isUltima = numeroDaQuestaoAtual == quantidadeDeQuestoes-1 ? true : false

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none"
    document.getElementById('jogo').style.display = "none"
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex"
    document.getElementById('jogo').style.display = "flex"
    document.getElementById('btnIniciarQuiz').style.display = "none"
    document.getElementById('tituloQuiz').style.display = "none"

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes

    preencherHTMLcomQuestaoAtual(0)

    btnSubmeter.disabled = false
    btnProx.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = true
}

function preencherHTMLcomQuestaoAtual(index) {
    habilitarAlternativas(true)
    const questaoAtual = listaDeQuestoes[index]
    numeroDaQuestaoAtual = index
    console.log("questaoAtual")
    console.log(questaoAtual)
    document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1 // ajustando porque o index começa em 0
    document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
    document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
    document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
    document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
    document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
}

function submeter() {
    const options = document.getElementsByName("option"); // recupera alternativas no html

    let hasChecked = false
    for (let i = 0; i < options.length; i++) {
        if (options[i].checked) {
            hasChecked = true
            break
        }
    }

    if (!hasChecked) {
        alert("Não há alternativas escolhidas. Escolha uma opção.")
    } else {
        btnSubmeter.disabled = true
        btnProx.disabled = false

        habilitarAlternativas(false)

        checarResposta()
    }
}

function habilitarAlternativas(trueOrFalse) {
    let opcaoEscolhida = trueOrFalse ? false : true

    primeiraOpcao.disabled = opcaoEscolhida
    segundaOpcao.disabled = opcaoEscolhida
    terceiraOpcao.disabled = opcaoEscolhida
    quartaOpcao.disabled = opcaoEscolhida

}

function avancar() {
    btnProx.disabled = true
    btnSubmeter.disabled = false

    desmarcarRadioButtons()

    if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else if (numeroDaQuestaoAtual == quantidadeDeQuestoes - 1) {
        alert("Atenção... a próxima é a ultima questão!")
        preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual)
    } else {
        finalizarJogo()
    }
    limparCoresBackgroundOpcoes()
}

function tentarNovamente() {
    // atualiza a página
    window.location.reload()
}

function checarResposta() {
    const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual] // questão atual
    const respostaQuestaoAtual = questaoAtual.alternativaCorreta // qual é a resposta correta da questão atual

    const options = document.getElementsByName("option"); // recupera alternativas no html

    let alternativaCorreta = null // variável para armazenar a alternativa correta

    options.forEach((option) => {
        if (option.value === respostaQuestaoAtual) {
            console.log("alternativaCorreta está no componente: " + alternativaCorreta)
            alternativaCorreta = option.labels[0].id
        }
    })

    // verifica se resposta assinalada é correta
    options.forEach((option) => {
        if (option.checked === true && option.value === respostaQuestaoAtual) {
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            pontuacaoFinal++
            certas++
            document.getElementById("spanCertas").innerHTML = certas
            numeroDaQuestaoAtual++
        } else if (option.checked && option.value !== respostaQuestaoAtual) {
            const wrongLabelId = option.labels[0].id

            document.getElementById(wrongLabelId).classList.add("text-danger-with-bg")
            document.getElementById(alternativaCorreta).classList.add("text-success-with-bg")
            tentativaIncorreta++
            erradas++
            document.getElementById("spanErradas").innerHTML = erradas
            numeroDaQuestaoAtual++
        }
    })
}

function limparCoresBackgroundOpcoes() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg")
        document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg")
    })
}

function desmarcarRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

function finalizarJogo() {
    let textoParaMensagemFinal = null
    let classComCoresParaMensagemFinal = null
    const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes

    if (porcentagemFinalDeAcertos <= 0.3) {
        textoParaMensagemFinal = "Parece que você não estudou..."
        classComCoresParaMensagemFinal = "text-danger-with-bg"
    }
    else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
        textoParaMensagemFinal = "Pode melhorar na próxima, hein!"
        classComCoresParaMensagemFinal = "text-warning-with-bg"
    }
    else if (porcentagemFinalDeAcertos >= 0.9) {
        textoParaMensagemFinal = "Uau, parabéns!"
        classComCoresParaMensagemFinal = "text-success-with-bg"
    }

    textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões."


    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal
    document.getElementById('msgFinal').classList.add(classComCoresParaMensagemFinal)
    document.getElementById('spanPontuacaoFinal').innerHTML = pontuacaoFinal

    document.getElementById('jogo').classList.add("text-new-gray")

    btnProx.disabled = true
    btnSubmeter.disabled = true
    // btnConcluir.disabled = true
    btnTentarNovamente.disabled = false

    // Chamar a função para enviar os dados do quiz para o banco de dados
    enviarDadosQuiz(certas, erradas, pontuacaoFinal);
}

function enviarDadosQuiz(acertos, erros, pontuacaoFinal) {
    // Capturar o ID do usuário da sessão (assumindo que está armazenado)
    const idUsuario = sessionStorage.getItem('ID_USUARIO');

    // Se não houver usuário logado, alertar e redirecionar para login
    if (idUsuario == null) {
        alert("Você precisa estar logado para salvar seus resultados!");
        window.location = "login.html";
        return;
    }

    // Criar objeto com os dados do quiz
    const dadosQuiz = {
        idUsuario: idUsuario,
        acertos: acertos,
        erros: erros,
        pontuacaoFinal: pontuacaoFinal
    };

    // Enviar dados para o servidor
    fetch("/usuarios/registrarQuiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dadosQuiz)
    })
        .then(resposta => {
            if (resposta.ok) {
                console.log("Resultados do quiz registrados com sucesso!");
            } else {
                console.error("Erro ao registrar resultados do quiz");
            }
        })
        .catch(erro => {
            console.error("Erro na requisição:", erro);
        });
}

function salvarResultado(acertos, erros) {
    fetch("/quiz/registrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: sessionStorage.ID_USUARIO,
            acertosServer: acertos,
            errosServer: erros
        })
    }).then(function (resposta) {
        console.log("Resultado do quiz registrado com sucesso!");
    }).catch(function (erro) {
        console.log(erro);
    });
}
