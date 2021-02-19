"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var routes = express_1.Router();
routes.get('/:message', function (req, res) {
    var message = req.params.message;
    return res.send(message);
});
exports.default = routes;
