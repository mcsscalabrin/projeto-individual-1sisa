var database = require("../database/config");

function publicar(titulo, descricao, videoUrl, idUsuario) {
    // Primeiro, obter o próximo ID
    return database.executar("SELECT IFNULL(MAX(idVideo), 0) + 1 AS proximoId FROM video")
        .then(function (resultado) {
            var proximoId = resultado[0].proximoId;

            // Escapar aspas simples nos textos
            titulo = titulo.replace(/'/g, "''");
            if (descricao) descricao = descricao.replace(/'/g, "''");
            videoUrl = videoUrl.replace(/'/g, "''");

            // Montar a consulta SQL com os valores escapados
            var sql = `INSERT INTO video (idVideo, titulo, descricao, video, fkUsuario)
                      VALUES (${proximoId}, '${titulo}', '${descricao || ""}', '${videoUrl}', ${idUsuario})`;

            console.log("SQL a ser executada:", sql);

            return database.executar(sql);
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
