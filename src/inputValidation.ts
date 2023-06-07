import { APIErrorResult, CreateVideoInputModel, FieldError, UpdateVideoInputModel } from "./types/models"
import { RESOLUTIONS } from "./data"

export class Validate {



    CreateVideo(input: CreateVideoInputModel): { HTTPStatus: number, Response: undefined | APIErrorResult, Success: boolean } {

        let errors: FieldError[] = []

        if (!equalType(input.title, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'title' })
        }
        if (!equalType(input.author, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'author' })
        }
        if (input.title.length > 40) {
            errors.push({
                message: 'Too many characters! (maxLength: 40)',
                field: 'title' })
        }
        if (input.author.length > 20) {
            errors.push({
                message: 'Too many characters! (maxLength: 20)',
                field: 'author' })
        }
        if (!arrayStrictMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
            errors.push({
                message: 'At least one resolution should be added!',
                field: 'availableResolutions' })
        }

        if (errors) {
            return { HTTPStatus: 400, Response: { errorsMessages: errors }, Success: false }
        }

        return { HTTPStatus: 201, Response: undefined, Success: true }

    }



    UpdateVideo(input: UpdateVideoInputModel): { HTTPStatus: number, Response: undefined | APIErrorResult, Success: boolean } {

        let errors: FieldError[] = []

        if (!equalType(input.title, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'title' })
        }
        if (!equalType(input.author, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'author' })
        }
        if (!equalType(input.publicationDate, '')) {
            errors.push({
                message: 'Incorrect type!',
                field: 'publicationDate' })
        }
        if (!equalType(input.minAgeRestriction, 0) && !equalType(input.minAgeRestriction, null)) {
            errors.push({
                message: 'Incorrect type!',
                field: 'minAgeRestriction' })
        }
        if (!equalType(input.canBeDownloaded, false)) {
            errors.push({
                message: 'Incorrect type!',
                field: 'canBeDownloaded'
            })
        }
        if (input.title.length > 40) {
            errors.push({
                message: 'Too many characters! (maxLength: 40)',
                field: 'title'
            })
        }
        if (input.author.length > 20) {
            errors.push({
                message: 'Too many characters! (maxLength: 20)',
                field: 'author'
            })
        }
        if (!arrayStrictMatch(Object.keys(RESOLUTIONS), input.availableResolutions)) {
            errors.push({
                message: 'At least one resolution should be added!',
                field: 'availableResolutions'
            })
        }

        const dateIsValid = (new Date(Date.parse(input.publicationDate)).toISOString() ===
            new Date(input.publicationDate).toISOString())

        if (!dateIsValid) {
            errors.push({
                message: 'Incorrect date-time format!',
                field: 'publicationDate'
            })
        }

        if (input.minAgeRestriction !== null) {
            if (input.minAgeRestriction > 18 || input.minAgeRestriction < 1) {
                errors.push({
                    message: 'minAgeRestriction should be null or (1 - 18)!',
                    field: 'minAgeRestriction'
                })
            }
        }

        if (errors) {
            return { HTTPStatus: 400, Response: { errorsMessages: errors }, Success: false }
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