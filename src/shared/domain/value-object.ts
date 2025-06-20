interface ValueObjectProps {
    [index: string]: any
}

export abstract class ValueObject<T extends ValueObjectProps> {
    public props: T

    constructor(props: T) {
        let baseProps: any = {
            ...props,
        }
        this.props = baseProps
    }

    public equals(vo?: ValueObject<T>): boolean {
        if (vo === undefined || vo === null) {
            return false
        }
        if (vo.props === undefined) {
            return false
        }

        return JSON.stringify(this.props) === JSON.stringify(vo.props)
    }
}
