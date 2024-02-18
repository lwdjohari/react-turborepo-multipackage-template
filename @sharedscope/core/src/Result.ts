/**
 * Represents a successful result with a value of type T.
 * @template T - The type of the value.
 */
export class Ok<T> {
  constructor(public value: T) { }

  /**
   * Checks if the result is Ok.
   * @returns {boolean} - True if the result is Ok, false otherwise.
   */
  isOk(): this is Ok<T> {
    return true;
  }

  /**
   * Checks if the result is Err.
   * @returns {boolean} - True if the result is Err, false otherwise.
   */
  isErr(): this is Err<T, never> {
    return false;
  }

  /**
   * Unwraps the result and returns the value.
   * @returns {T} - The value of the result.
   */
  unwrap(): T {
    return this.value;
  }
}

/**
 * Represents an error result in the Result type.
 * @template T - The type of the value in the Ok result.
 * @template E - The type of the error in the Err result.
 */
export class Err<T, E> {
  /**
   * Creates a new instance of the Err class.
   * @param error - The error value.
   */
  constructor(public error: E) { }

  /**
   * Checks if the result is an Ok result.
   * @returns A boolean indicating if the result is an Ok result.
   */
  isOk(): this is Ok<never> {
    return false;
  }

  /**
   * Checks if the result is an Err result.
   * @returns A boolean indicating if the result is an Err result.
   */
  isErr(): this is Err<T, E> {
    return true;
  }

  /**
   * Unwraps the value from the result.
   * @throws The error value.
   * @returns The unwrapped value.
   */
  unwrap(): T {
    throw this.error;
  }
}



/**
 * Represents a result that can either be successful (`Ok`) or contain an error (`Err`).
 * @typeparam T The type of the successful result.
 * @typeparam E The type of the error.
 */
export type Result<T, E> = Ok<T> | Err<T, E>;