var database = require("../database/config");

function buscarEstatisticasUsuario(idUsuario) {
    console.log("ACESSEI O ESTATISTICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarEstatisticasUsuario()");

    var instrucao = `
        SELECT
            COUNT(*) as totalQuizzes,
            SUM(qtdAcertos) as totalAcertos,
            SUM(qtdErros) as totalErros,
            ROUND((SUM(qtdAcertos) / (SUM(qtdAcertos) + SUM(qtdErros))) * 100, 1) as mediaAcertos
        FROM registro_quiz
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function buscarMelhorPontuacao(idUsuario) {
    console.log("ACESSEI O ESTATISTICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarMelhorPontuacao()");

    var instrucao = `
        SELECT
            MAX(qtdAcertos) as melhorPontuacao
        FROM registro_quiz
        WHERE fkUsuario = ${idUsuario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

/*
function buscarRankingUsuario(idUsuario) {
    console.log("ACESSEI O ESTATISTICA MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarRankingUsuario()");

    var instrucao = `
        SELECT
            u.id as fkUsuario,
            u.nome,
            MAX(rq.qtdAcertos) as melhorPontuacao
        FROM registro_quiz rq
        JOIN usuario u ON rq.fkUsuario = u.id
        GROUP BY u.id, u.nome
        ORDER BY melhorPontuacao DESC;
    `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
*/
module.exports = {
    buscarEstatisticasUsuario,
    buscarMelhorPontuacao
    //buscarRankingUsuario
};
