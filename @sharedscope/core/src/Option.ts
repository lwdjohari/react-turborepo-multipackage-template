/**
 * Represents a value that is present.
 * @template T - The type of the value.
 */
export class Some<T> {

    /**
     * Creates a new instance of Some.
     * @param value - The value to be wrapped.
     */
    constructor(public value: T) { }

    /**
     * Unwraps the value.
     * @returns The unwrapped value.
     */
    unwrap(): T {
        return this.value;
    }

    /**
     * Checks if the option is Some.
     * @returns True if the option is Some, false otherwise.
     */
    isSome(): this is Some<T> {
        return true;
    }

    /**
     * Checks if the option is None.
     * @returns True if the option is None, false otherwise.
     */
    isNone(): this is None {
        return false;
    }
}

/**
 * Represents the None variant of the Option type.
 */
export class None {
    /**
     * Checks if the Option is of type Some.
     * @returns False, indicating that it is not of type Some.
     */
    isSome(): this is Some<never> {
        return false;
    }

    /**
     * Checks if the Option is of type None.
     * @returns True, indicating that it is of type None.
     */
    isNone(): this is None {
        return true;
    }

    /**
     * Unwraps the Option, throwing an error since it is of type None.
     * @throws Error indicating that `unwrap()` was called on a `None` value.
     */
    unwrap(): never {
        throw new Error('Called `unwrap()` on a `None` value');
    }
}


/**
 * Represents an option type that can either hold a value of type T or be empty.
 * @typeparam T The type of the value held by the option.
 */
export type Option<T> = Some<T> | None;