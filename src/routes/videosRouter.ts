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
    res.status(result.HTTPStatus).json(result.Response)
})



videosRouter.get('/', (req: Request, res: Response<Array<object | null>>) => {
    res.status(200).json(db.getAll(TABLE.VIDEOS))
})



videosRouter.get('/:id', (req: TypeOfRequestP<{id: string}>, res: Response<object | null>) => {

    if (!db.exists(TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404)
    }
    res.status(200).json(db.get(TABLE.VIDEOS, +req.params.id))
})



videosRouter.put('/:id', (req: TypeOfRequestP_Body<{id: string},
    UpdateVideoInputModel>, res: Response<null | APIErrorResult>) => {

    if (!req.body) {
        res.sendStatus(400)
    }
    if (!db.exists(TABLE.VIDEOS, +req.params.id)) {
        res.sendStatus(404)
    }
    const result = validate.UpdateVideo(+req.params.id, req.body)
    res.status(result.HTTPStatus).json(result.Response)
})



videosRouter.delete('/:id', (req: TypeOfRequestP<{id: string}>, res: Response) => {
    res.sendStatus(db.delete(TABLE.VIDEOS, +req.params.id))
})