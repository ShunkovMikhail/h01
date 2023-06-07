import express, { Request, Response } from 'express'
import { DB, TABLE } from './data'
import { videosRouter } from "./routes/videosRouter";

export const app = express()

const db: DB = new DB()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.sendStatus(204)
})

app.delete('/testing/all-data', (req: Request, res: Response) => {
    res.sendStatus(db.clear(TABLE.VIDEOS))
})

app.use('/videos', videosRouter)


