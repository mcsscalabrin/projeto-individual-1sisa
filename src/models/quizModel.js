var database = require("../database/config")

function listar() {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM registro_quiz;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function registrar(idTentativa, fkUsuario, qtdAcertos, qtdErros) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrar(): ", idTentativa, fkUsuario, qtdAcertos, qtdErros);

    var instrucao = `
        INSERT INTO registro_quiz (idTentativa, fkUsuario, qtdAcertos, qtdErros)
        VALUES (${idTentativa}, ${fkUsuario}, ${qtdAcertos}, ${qtdErros});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function registrarQuiz(idUsuario, acertos, erros, dataHora) {
    console.log("ACESSEI O QUIZ MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function registrarQuiz():", idUsuario, acertos, erros, dataHora);

    var instrucao = `
        INSERT INTO registro_quiz (fkUsuario, qtdAcertos, qtdErros, dtHora)
        VALUES (${idUsuario}, ${acertos}, ${erros}, DEFAULT);
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    listar,
    registrar,
    registrarQuiz
};
