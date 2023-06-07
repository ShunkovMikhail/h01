import { Request, Response, Router } from 'express'
import { DB, TABLE } from '../data'
import { TypeOfRequestP, TypeOfRequestBody, TypeOfRequestP_Body,
    CreateVideoInputModel, VideoModel, APIErrorResult, UpdateVideoInputModel } from "../types/models"

import { Validate } from "../inputValidation"

export const videosRouter = Router({})

const db: DB = new DB()
const validate: Validate = new Validate()



videosRouter.post('/', (req: TypeOfRequestBody<CreateVideoInputModel>, res: Response<VideoModel | APIErrorResult>) => {
    if (!req.body) {
        res.sendStatus(400)
    }

    const result = validate.CreateVideo(req.body)

    if (result.Success) {
        const newEntry: VideoModel = {
            id: db.nextID(TABLE.VIDEOS),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 86400000).toISOString(),
            availableResolutions: req.body.availableResolutions
        }
        db.create(TABLE.VIDEOS, newEntry)
        res.status(result.HTTPStatus).json(newEntry)
    } else {
        res.status(result.HTTPStatus).json(result.Response)
    }
})



videosRouter.get('/', (req: Request, res: Response<Array<object | null>>) => {
    res.status(200).json(db.getAll(TABLE.VIDEOS))
})



videosRouter.get('/:id', (req: TypeOfRequestP<{id: string}>, res: Response<object | null>) => {

    if (!db.exists(TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404)
    } else {
        res.status(200).json(db.get(TABLE.VIDEOS, +req.params.id))
    }
})



videosRouter.put('/:id', (req: TypeOfRequestP_Body<{id: string},
    UpdateVideoInputModel>, res: Response<null | APIErrorResult>) => {

    if (!req.body) {
        res.sendStatus(400)
    }
    if (!db.exists(TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404)
    }
    const result = validate.UpdateVideo(req.body)

    if (result.Success) {
        const updateEntry: UpdateVideoInputModel = {
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: req.body.canBeDownloaded,
            minAgeRestriction: req.body.minAgeRestriction,
            publicationDate: req.body.publicationDate,
            availableResolutions: req.body.availableResolutions
        }
        db.update(+req.params.id, TABLE.VIDEOS, updateEntry)
        res.sendStatus(result.HTTPStatus)
    } else {
        res.status(result.HTTPStatus).json(result.Response)
    }
})



videosRouter.delete('/:id', (req: TypeOfRequestP<{id: string}>, res: Response) => {
    res.sendStatus(db.delete(TABLE.VIDEOS, +req.params.id))
})