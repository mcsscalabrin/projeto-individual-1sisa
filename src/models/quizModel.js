var database = require("../database/config")

function listar() {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucaoSql = `
        SELECT * FROM registro_quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrar(idTentativa, fkUsuario, qtdAcertos, qtdErros) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar(): ", idTentativa, fkUsuario, qtdAcertos, qtdErros);

    var instrucaoSql = `
        INSERT INTO registro_quiz (idTentativa, fkUsuario, qtdAcertos, qtdErros)
        VALUES (${idTentativa}, ${fkUsuario}, ${qtdAcertos}, ${qtdErros});`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function registrarQuiz(idUsuario, acertos, erros, dataHora) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrarQuiz():", idUsuario, acertos, erros, dataHora);

    var instrucaoSql = `
        INSERT INTO registro_quiz (fkUsuario, qtdAcertos, qtdErros, dtHora)
        VALUES (${idUsuario}, ${acertos}, ${erros}, DEFAULT);`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/*
function obterRankingMelhoresPontuacoes() {
    console.log("ACESSEI O QUIZ MODEL - obterRankingMelhoresPontuacoes()");
    var instrucaoSql = `
        SELECT u.id AS idUsuario, u.nome AS nomeUsuario,
            MAX(rq.qtdAcertos) as melhorPontuacao,
            MIN(rq.dtHora) as dataMelhorPontuacao -- critério de desempate
            FROM registro_quiz rq
            JOIN usuario u
            ON rq.fkUsuario = u.id
                GROUP BY u.id, u.nome
                ORDER BY melhorPontuacao DESC, dataMelhorPontuacao ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
*/

module.exports = {
    listar,
    registrar,
    registrarQuiz,
    //obterRankingMelhoresPontuacoes
};
