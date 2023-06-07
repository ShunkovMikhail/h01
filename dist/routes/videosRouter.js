"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const data_1 = require("../data");
const inputValidation_1 = require("../inputValidation");
exports.videosRouter = (0, express_1.Router)({});
const db = new data_1.DB();
const validate = new inputValidation_1.Validate();
exports.videosRouter.post('/', (req, res) => {
    if (!req.body) {
        res.sendStatus(400);
    }
    const result = validate.CreateVideo(req.body);
    res.status(result.HTTPStatus).json(result.Response);
});
exports.videosRouter.get('/', (req, res) => {
    res.status(200).json(db.getAll(data_1.TABLE.VIDEOS));
});
exports.videosRouter.get('/:id', (req, res) => {
    if (!db.exists(data_1.TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404);
    }
    res.status(200).json(db.get(data_1.TABLE.VIDEOS, +req.params.id));
});
exports.videosRouter.put('/:id', (req, res) => {
    if (!req.body) {
        res.sendStatus(400);
    }
    if (!db.exists(data_1.TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404);
    }
    const result = validate.UpdateVideo(+req.params.id, req.body);
    res.status(result.HTTPStatus).json(result.Response);
});
exports.videosRouter.delete('/:id', (req, res) => {
    res.sendStatus(db.delete(data_1.TABLE.VIDEOS, +req.params.id));
});
