var quizModel = require("../models/quizModel");

function listar(req, res) {
    quizModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function registrar(req, res) {
    var idTentativa = req.body.idTentativa;
    var fkUsuario = req.body.fkUsuario;
    var qtdAcertos = req.body.qtdAcertos;
    var qtdErros = req.body.qtdErros;

    if (idTentativa == undefined) {
        res.status(400).send("O id da tentativa está indefinido!");
    } else if (fkUsuario == undefined) {
        res.status(400).send("O id do usuário está indefinido!");
    } else if (qtdAcertos == undefined) {
        res.status(400).send("A quantidade de acertos está indefinida!");
    } else if (qtdErros == undefined) {
        res.status(400).send("A quantidade de erros está indefinida!");
    } else {
        quizModel.registrar(idTentativa, fkUsuario, qtdAcertos, qtdErros)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o registro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function registrarQuiz(req, res) {
    var idUsuario = req.body.idUsuarioServer;
    var acertos = req.body.acertosServer;
    var erros = req.body.errosServer;
    var dataHora = req.body.dataHoraServer;

    quizModel.registrarQuiz(idUsuario, acertos, erros, dataHora)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao registrar o quiz: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

/* tirei a kpi de ranking por conta do quiz ser curto, e a pessoa que tirar 10/10 primeiro, sempre estará no 1° lugar do ranking
function obterPosicaoRanking(req, res) {
    const idUsuarioLogado = req.params.idUsuario;

    if (idUsuarioLogado == undefined) {
        res.status(400).send("O ID do usuário está indefinido na requisição.");
        return;
    }

    quizModel.obterRankingMelhoresPontuacoes()
        .then(function (rankingCompleto) {
            if (rankingCompleto.length > 0) {
                let posicaoUsuario = -1;
                for (let i = 0; i < rankingCompleto.length; i++) {
                    if (rankingCompleto[i].idUsuario == idUsuarioLogado) {
                        posicaoUsuario = i + 1;
                        break;
                    }
                }

                if (posicaoUsuario != -1) {
                    res.status(200).json({
                        posicao: posicaoUsuario,
                        totalParticipantes: rankingCompleto.length
                    });
                } else {
                    res.status(200).json({
                        posicao: '-',
                        totalParticipantes: rankingCompleto.length
                    });
                }
            } else {
                res.status(204).send("Nenhum resultado de quiz encontrado para gerar ranking.");
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao obter o ranking: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}
*/

module.exports = {
    listar,
    registrar,
    registrarQuiz,
    //obterPosicaoRanking
}
