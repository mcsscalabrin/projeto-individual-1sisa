var express = require("express");
var router = express.Router();

var estatisticaController = require("../controllers/estatisticaController");

router.get("/usuario/:idUsuario", function (req, res) {
    estatisticaController.buscarEstatisticasUsuario(req, res);
});

router.get("/melhor-pontuacao/:idUsuario", function (req, res) {
    estatisticaController.buscarMelhorPontuacao(req, res);
});

/*
router.get("/ranking/:idUsuario", function (req, res) {
    estatisticaController.buscarRankingUsuario(req, res);
});
*/

module.exports = router;
