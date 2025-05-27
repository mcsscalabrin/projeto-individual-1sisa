var express = require("express");
var router = express.Router();

var videoController = require("../controllers/videoController");

router.post("/publicar", function (req, res) {
    videoController.publicar(req, res);
});

router.get("/listar", function (req, res) {
    videoController.listar(req, res);
});

module.exports = router;
