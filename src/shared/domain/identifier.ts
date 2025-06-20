export class Identifier<T> {
    constructor(private value: T) {
        this.value = value
    }

    equals(id?: Identifier<T>): boolean {
        if (id === undefined || id === null) {
            return false
        }

        if (!(id instanceof this.constructor)) {
            return false
        }
        return id.toValue() === this.value
    }

    toString() {
        return String(this.value)
    }

    toValue() {
        return this.value
    }
}
