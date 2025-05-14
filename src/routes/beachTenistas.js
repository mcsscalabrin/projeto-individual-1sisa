var express = require("express");
var router = express.Router();

var beachTenistaController = require("../controllers/beachTenistaController");

router.get("/", function (req, res) {
    beachTenistaController.listar(req, res);
});

router.get("/:id", function (req, res) {
    beachTenistaController.listarPorId(req, res);
});

module.exports = router;
