import { APIErrorResult, CreateVideoInputModel, UpdateVideoInputModel, VideoModel } from "./types/models"
import { DB, RESOLUTIONS, TABLE } from "./data"

const db: DB = new DB()

export class Validate {



    CreateVideo(input: CreateVideoInputModel): { HTTPStatus: number, Response: undefined | APIErrorResult, Success: boolean } {
        if (!equalType(input.title, '')) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'title' } }, Success: false
            }
        }
        if (!equalType(input.author, '')) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'author' } }, Success: false
            }
        }
        if (input.title.length > 40) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                    message: 'Too many characters! (maxLength: 40)',
                        field: 'title' } }, Success: false
            }
        }
        if (input.author.length > 20) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                    message: 'Too many characters! (maxLength: 20)',
                        field: 'author' } }, Success: false
            }
        }
        if (!arrayStrictMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                    message: 'At least one resolution should be added!',
                        field: 'availableResolutions' } }, Success: false
            }
        }

        return { HTTPStatus: 201, Response: undefined, Success: true }

    }



    UpdateVideo(input: UpdateVideoInputModel): { HTTPStatus: number, Response: undefined | APIErrorResult, Success: boolean } {
        if (!equalType(input.title, '')) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'title' } }, Success: false
            }
        }
        if (!equalType(input.author, '')) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'author' } }, Success: false
            }
        }
        if (!equalType(input.publicationDate, '')) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'publicationDate' } }, Success: false
            }
        }
        if (!equalType(input.minAgeRestriction, 0) && !equalType(input.minAgeRestriction, null)) {
            return { HTTPStatus: 400,
                Response: { errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'minAgeRestriction' } }, Success: false
            }
        }
        if (!equalType(input.canBeDownloaded, false)) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'Incorrect type!',
                        field: 'canBeDownloaded'
                    }
                }, Success: false
            }
        }
        if (input.title.length > 40) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'Too many characters! (maxLength: 40)',
                        field: 'title'
                    }
                }, Success: false
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
                }, Success: false
            }
        }
        if (!arrayStrictMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
            return {
                HTTPStatus: 400,
                Response: {
                    errorsMessages: {
                        message: 'At least one resolution should be added!',
                        field: 'availableResolutions'
                    }
                }, Success: false
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
                }, Success: false
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
                    }, Success: false
                }
            }
        }

        return { HTTPStatus: 204, Response: undefined, Success: true }

    }



}


/**Return true if the second array contains at least 1 value
 * and all values from the second array exactly match the first array.
 */
const arrayStrictMatch = (first: string[], second: string[] | null): boolean => {
    if (second === null) {
        return false
    }
    if (second.length < 1) {
        return false
    }
    for (let i = 0; i < second.length; i++) {
        if (first.indexOf(second[i]) === -1) {
            return false
        }
    }
    return true
}

const equalType = (a: unknown, b: unknown) => { return typeof(a) === typeof(b) }