var database = require("../database/config");

function publicar(titulo, descricao, videoUrl, idUsuario) {

    return database.executar("SELECT IFNULL(MAX(idVideo), 0) + 1 AS proximoId FROM video")
        .then(function (resultado) {
            var proximoId = resultado[0].proximoId;

            // trocando as aspas simples
            titulo = titulo.replace(/'/g, "''");
            if (descricao) descricao = descricao.replace(/'/g, "''");
            videoUrl = videoUrl.replace(/'/g, "''");

            var instrucaoSql = `INSERT INTO video (idVideo, titulo, descricao, video, fkUsuario)
                                VALUES (${proximoId}, '${titulo}', '${descricao || ""}', '${videoUrl}', ${idUsuario})`;

            console.log("SQL a ser executada:", instrucaoSql);

            return database.executar(instrucaoSql);
        });
}

function listar() {
    return database.executar(
        `SELECT v.idVideo, v.titulo, v.descricao, v.video as videoUrl, v.dtHora, u.nome as nomeUsuario
            FROM video v
            JOIN usuario u ON v.fkUsuario = u.id
            ORDER BY v.dtHora DESC`
    );
}

module.exports = {
    publicar,
    listar
};
