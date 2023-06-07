import { Request } from 'express'

export type TypeOfRequestBody< T > = Request< {},{},T >
export type TypeOfRequestP< T > = Request< T >
//export type TypeOfRequestQuery< T > = Request< {},{},{},T >
export type TypeOfRequestP_Body< T,U > = Request< T,{},U >

export type CreateVideoInputModel = {
    title: string
    author: string
    availableResolutions: string[] | null
}

export type VideoModel = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: string[] | null
}

export type UpdateVideoInputModel = {
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    publicationDate: string
    availableResolutions: string[] | null
}

export type APIErrorResult = {
    errorsMessages: FieldError[]
}

export type FieldError = {
    message: string | null
    field: string | null
}


