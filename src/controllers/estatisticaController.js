var estatisticaModel = require("../models/estatisticaModel");

function buscarEstatisticasUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando estatísticas do usuário ID: ${idUsuario}`);

    estatisticaModel.buscarEstatisticasUsuario(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as estatísticas do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function buscarMelhorPontuacao(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando melhor pontuação do usuário ID: ${idUsuario}`);

    estatisticaModel.buscarMelhorPontuacao(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado[0]);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar a melhor pontuação do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

/*
function buscarRankingUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    console.log(`Recuperando posição no ranking do usuário ID: ${idUsuario}`);

    estatisticaModel.buscarRankingUsuario(idUsuario).then(function (resultado) {
        if (resultado.length > 0) {
            let posicaoUsuario = -1;
            for (let i = 0; i < resultado.length; i++) {
                if (resultado[i].fkUsuario == idUsuario) {
                    posicaoUsuario = i + 1;
                    break;
                }
            }

            res.status(200).json({
                posicao: posicaoUsuario,
                totalParticipantes: resultado.length
            });
        } else {
            res.status(204).send("Nenhum resultado encontrado para o ranking!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o ranking do usuário.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}
*/

module.exports = {
    buscarEstatisticasUsuario,
    buscarMelhorPontuacao
    //buscarRankingUsuario
};
