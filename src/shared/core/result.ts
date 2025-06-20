export class Result<T> {
    public isSuccess: boolean
    public isFailure: boolean
    private error: T | string | undefined
    private _value: T | undefined

    constructor(isSuccess: boolean, error?: T | string, value?: T) {
        if (isSuccess && error) {
            throw new Error(
                "InvalidOperation: A result cannot be successful and contain an error"
            )
        }

        if (!isSuccess && !error) {
            throw new Error(
                "InvalidOperation: A failing result needs to contain an error message."
            )
        }

        this.isSuccess = isSuccess
        this.isFailure = !isSuccess
        this.error = error
        this._value = value

        Object.freeze(this)
    }

    public getValue(): T {
        if (!this.isSuccess) {
            console.log(this.error)
            throw new Error(
                "Cant't get the value on an error. Use 'errorValue' instead."
            )
        }

        return this._value!
    }

    public getErrorValue(): T {
        return this.error as T
    }

    public static ok<U>(value?: U): Result<U> {
        return new Result<U>(true, undefined, value)
    }

    public static fail<U>(error: string): Result<U> {
        return new Result<U>(false, error)
    }

    public static combine(results: Result<any>[]): Result<any> {
        for (let result of results) {
            if (result.isFailure) return result
        }

        return Result.ok()
    }
}
