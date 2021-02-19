"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var rotes_1 = __importDefault(require("./rotes"));
var app = express_1.default();
app.use(rotes_1.default);
app.use(express_1.default.json());
app.listen(3000 || process.env.PORT);
