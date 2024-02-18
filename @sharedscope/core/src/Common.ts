/**
 * Represents a key-value pair.
 * @template K The type of the key.
 * @template V The type of the value.
 */
export class Pair<K, V> {
  /**
   * Creates a new instance of Pair.
   * @param key The key of the pair.
   * @param value The value of the pair.
   */
  constructor(public key: K, public value: V) {}

  /**
   * Creates a new Pair instance.
   * @param key The key of the pair.
   * @param value The value of the pair.
   * @returns A new Pair instance.
   */
  static new<K, V>(key: K, value: V): Pair<K, V> {
    return new Pair(key, value);
  }
}
