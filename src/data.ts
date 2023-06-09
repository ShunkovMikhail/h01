
export enum RESOLUTIONS { 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160' }

//-------------------DB------------------------+
export enum TABLE { VIDEOS = 0 }
let data: Array<Array<object | null>> = [[]]
let increment: number[] = [-1];
//-------------------DB------------------------+

export class DB {

    create(table: number, input: object) {
        data[table].push(input)
        increment[table]++
    }

    get(table: number, id: number): object | null {
        return data[table][id]
    }

    getAll(table: number): Array<object | null> {
        return data[table].filter(o => o !== null)
    }

    update(id: number, table: number, input: object) {
        console.log(data[table] , 'data')
        data[table][id] = Object.assign({}, data[table][id], input)
    }

    delete(table: number, id: number): number {
        if (!data[table][id] || data[table][id] === null) {
            return 404
        }
        data[table][id] = null
        return 204
    }

    clear(table: number): number {
        data[table] = []
        return 204
    }

    lastID(table: number): number {
        return increment[table]
    }

    exists(table: number, id: number): boolean {
        return !(!data[table][id] || data[table][id] === null)
    }

}