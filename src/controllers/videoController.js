var videoModel = require("../models/videoModel");

function publicar(req, res) {
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    var videoUrl = req.body.videoUrl;
    var idUsuario = req.body.idUsuario;

    if (titulo == undefined) {
        res.status(400).send("Título é obrigatório!");
    } else if (idUsuario == undefined) {
        res.status(400).send("Usuário não identificado!");
    } else if (videoUrl == undefined) {
        res.status(400).send("A URL do vídeo é obrigatória!");
    } else {
        // Salvar informações no banco de dados
        videoModel.publicar(titulo, descricao, videoUrl, idUsuario)
            .then(function (resultado) {
                res.status(201).json(resultado);
            }).catch(function (erro) {
                console.log(erro);
                console.log("Houve um erro ao publicar o vídeo: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

function listar(req, res) {
    videoModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(200).json([]);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar os vídeos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    publicar,
    listar
};

function listar(req, res) {
    videoModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(200).json([]);
            }
        }).catch(function (erro) {
            console.log(erro);
            console.log("Houve um erro ao listar os vídeos: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    publicar,
    listar
};
