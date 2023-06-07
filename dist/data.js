"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = exports.TABLE = exports.RESOLUTIONS = void 0;
var RESOLUTIONS;
(function (RESOLUTIONS) {
    RESOLUTIONS[RESOLUTIONS["P144"] = 0] = "P144";
    RESOLUTIONS[RESOLUTIONS["P240"] = 1] = "P240";
    RESOLUTIONS[RESOLUTIONS["P360"] = 2] = "P360";
    RESOLUTIONS[RESOLUTIONS["P480"] = 3] = "P480";
    RESOLUTIONS[RESOLUTIONS["P720"] = 4] = "P720";
    RESOLUTIONS[RESOLUTIONS["P1080"] = 5] = "P1080";
    RESOLUTIONS[RESOLUTIONS["P1440"] = 6] = "P1440";
    RESOLUTIONS[RESOLUTIONS["P2160"] = 7] = "P2160";
})(RESOLUTIONS = exports.RESOLUTIONS || (exports.RESOLUTIONS = {}));
//-------------------DB------------------------+
var TABLE;
(function (TABLE) {
    TABLE[TABLE["VIDEOS"] = 0] = "VIDEOS";
})(TABLE = exports.TABLE || (exports.TABLE = {}));
let data = [[]];
let increment = [-1];
//-------------------DB------------------------+
class DB {
    create(table, input) {
        data[table].push(input);
        increment[table]++;
    }
    get(table, id) {
        return data[table][id];
    }
    getAll(table) {
        return data[table].filter(o => o !== null);
    }
    update(id, table, input) {
        console.log(data[table], 'data');
        data[table][id] = Object.assign({}, data[table][id], input);
    }
    delete(table, id) {
        if (!data[table][id] || data[table][id] === null) {
            return 404;
        }
        data[table][id] = null;
        return 204;
    }
    clear(table) {
        data[table] = [];
        return 204;
    }
    lastID(table) {
        return increment[table];
    }
    exists(table, id) {
        return !(!data[table][id] || data[table][id] === null);
    }
}
exports.DB = DB;
