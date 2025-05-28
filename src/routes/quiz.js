var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/", function (req, res) {
    quizController.listar(req, res);
});

router.post("/registrar", function (req, res) {
    quizController.registrar(req, res);
});

router.post("/registrarQuiz", function (req, res) {
    quizController.registrarQuiz(req, res);
});

/*
router.get("/ranking/:idUsuario", function (req, res) {
    quizController.obterPosicaoRanking(req, res);
});
*/
module.exports = router;
