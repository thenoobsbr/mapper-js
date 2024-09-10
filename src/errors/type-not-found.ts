export class TypeNotFound extends Error {
    constructor(type: Symbol) {
        super(`Type ${type} not found`)
    }
}