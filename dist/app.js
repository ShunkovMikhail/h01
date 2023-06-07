"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const data_1 = require("./data");
const videosRouter_1 = require("./routes/videosRouter");
exports.app = (0, express_1.default)();
const db = new data_1.DB();
exports.app.use(express_1.default.json());
exports.app.get('/', (req, res) => {
    res.sendStatus(204);
});
exports.app.delete('/testing/all-data', (req, res) => {
    res.sendStatus(db.clear(data_1.TABLE.VIDEOS));
});
exports.app.use('/videos', videosRouter_1.videosRouter);
