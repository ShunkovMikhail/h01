import { APIErrorResult, CreateVideoInputModel, UpdateVideoInputModel, VideoModel } from "./types/models"
import { DB, RESOLUTIONS, TABLE } from "./data"

const db: DB = new DB()

export class Validate {



    CreateVideo(input: CreateVideoInputModel): { HTTPStatus: number, Response: VideoModel | APIErrorResult } {
        if (input.title.length > 40) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                    message: 'Too many characters! (maxLength: 40)',
                        field: 'title' } }
            }
        }
        if (input.author.length > 20) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                    message: 'Too many characters! (maxLength: 20)',
                        field: 'author' } }
            }
        }
        if (!arrayFullMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                    message: 'At least one resolution should be added!',
                        field: 'availableResolutions' } }
            }
        }

        const newEntry: VideoModel = {
            id: db.lastID(TABLE.VIDEOS) + 1,
            title: input.title,
            author: input.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date(Date.now() + 86400000).toISOString(),
            availableResolutions: input.availableResolutions
        }
        db.create(TABLE.VIDEOS, newEntry)
        return { HTTPStatus: 201, Response: newEntry }
    }



    UpdateVideo(id: number, input: UpdateVideoInputModel) {
        if (input.title.length > 40) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'Too many characters! (maxLength: 40)',
                        field: 'title'
                    }
                }
            }
        }
        if (input.author.length > 20) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'Too many characters! (maxLength: 20)',
                        field: 'author'
                    }
                }
            }
        }
        if (!arrayFullMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'At least one resolution should be added!',
                        field: 'availableResolutions'
                    }
                }
            }
        }

        const dateIsValid = (new Date(Date.parse(input.publicationDate)).toISOString() ===
            new Date(input.publicationDate).toISOString())

        if (!dateIsValid) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'Incorrect date-time format!',
                        field: 'publicationDate'
                    }
                }
            }
        }

        if (input.minAgeRestriction !== null) {
            if (input.minAgeRestriction > 18 || input.minAgeRestriction < 1) {
                return {
                    HTTPStatus: 400,
                    Response: {
                        errorsMessages: {
                            message: 'minAgeRestriction should be null or (1 - 18)!',
                            field: 'minAgeRestriction'
                        }
                    }
                }
            }
        }

        const updateEntry: UpdateVideoInputModel = {
            title: input.title,
            author: input.author,
            canBeDownloaded: input.canBeDownloaded,
            minAgeRestriction: input.minAgeRestriction,
            publicationDate: input.publicationDate,
            availableResolutions: input.availableResolutions
        }
        db.update(id, TABLE.VIDEOS, updateEntry)
        return { HTTPStatus: 204, Response: null }
    }



}



const arrayFullMatch = (master: string[], slave: string[] | null): boolean => {
    if (slave === null) {
        return false
    }
    if (slave.length < 1) {
        return false
    }
    for (let i = 0; i < slave.length; i++) {
        if (master.indexOf(slave[i]) === -1) {
            return false
        }
    }
    return true
}