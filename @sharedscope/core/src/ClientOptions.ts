import { None, Option, Some } from "./Option";
import { Pair } from "./Common";

/**
 * Represents an endpoint for a service.
 */
export class Endpoint {
    endpoint_: string;
    port_: number = 443;
  
    /**
     * Creates a new Endpoint instance.
     * @param endpoint - The endpoint URL.
     * @param port - The port number (default is 443).
     */
    constructor(endpoint: string, port: number = 443) {
      this.endpoint_ = endpoint;
      this.port_ = port;
    }
  
    /**
     * Gets the base URL of the endpoint.
     * @returns The base URL.
     */
    public baseUrl(): string {
      return `${this.endpoint_}`;
    }
  
    /**
     * Gets the port number of the endpoint.
     * @returns The port number.
     */
    public port(): number {
      return this.port_;
    }
  
    /**
     * Gets the full endpoint URL, including the port if it's not 80 or 443.
     * @returns The full endpoint URL.
     */
    public endpoint(): string {
      if (this.port_ === 80 || this.port_ === 443) {
        return `${this.endpoint_}`;
      } else {
        return `${this.endpoint_}:${this.port_}`;
      }
    }
  }
  
  /**
   * Represents the options for a client.
   */
  export class ClientOptions {
    /**
     * The format of the client request/response.
     * @default 'binary'
     */
    format_: "text" | "binary" = 'binary';
  
    /**
     * The endpoint for the client.
     */
    endpoint_: Endpoint | undefined = undefined;
  
    /**
     * The headers for the client request.
     */
    headers_: Map<string, string> = new Map<string, string>();
  
    /**
     * The credentials for the client request.
     */
    credentials_: Pair<string, string> | undefined = undefined;
  
    /**
     * Creates a new instance of ClientOptions.
     */
    constructor() {
    }
  
    /**
     * Sets the format of the client request/response.
     * @param format The format to set, either 'text' or 'binary'.
     * @returns The updated ClientOptions instance.
     */
    public setFormat(format: 'text' | 'binary'): ClientOptions {
      this.format_ = format;
      return this;
    }
  
    /**
     * Sets the credentials for the client request.
     * @param token The token to set as credentials.
     * @returns The updated ClientOptions instance.
     */
    public setCredentials(token: string): ClientOptions {
      this.credentials_ = Pair.new('Authorization', `Bearer ${token}`);
      return this;
    }
  
    /**
     * Sets the endpoint for the client.
     * @param url The URL of the endpoint.
     * @param port The port of the endpoint.
     * @returns The updated ClientOptions instance.
     */
    public setEndpoint(url: string , port: number = 443): ClientOptions {
      this.endpoint_ = new Endpoint(url, port);
      return this;
    }
  
    /**
     * Adds a header to the client request.
     * @param key The key of the header.
     * @param value The value of the header.
     * @returns The updated ClientOptions instance.
     */
    public addHeaders(key: string, value: string): ClientOptions {
      this.headers_.set(key, value);
      return this;
    }
  
    /**
     * Removes a header from the client request.
     * @param key The key of the header to remove.
     * @returns True if the header was successfully removed, false otherwise.
     */
    public removeHeaders(key: string): boolean {
      return this.headers_.delete(key);
    }
  
    /**
     * Gets all the headers for the client request.
     * @returns A map of headers.
     */
    public headers(): Map<string, string> {
      return this.headers_;
    }
  
    /**
     * Gets the value of a specific header.
     * @param key The key of the header.
     * @returns The value of the header, or undefined if the header does not exist.
     */
    public header(key: string): string | undefined {
      return this.headers_.get(key);
    }
  
    /**
     * Clears all the headers for the client request.
     */
    public clearHeaders() {
      this.headers_.clear();
    }
  
    /**
     * Gets the credentials for the client request.
     * @returns The credentials, or undefined if no credentials are set.
     */
    public credentials(): Pair<string, string> | undefined {
      return this.credentials_;
    }
  
    /**
     * Gets the endpoint for the client.
     * @returns The endpoint, or undefined if no endpoint is set.
     */
    public endpoint(): Endpoint | undefined {
      return this.endpoint_;
    }
  
    /**
     * Gets the format of the client request/response.
     * @returns The format.
     */
    public format(): "text" | "binary" {
      return this.format_;
    }
  
    /**
     * Gets the headers as a record.
     * @returns The headers as a record.
     */
    public headerAsRecords(): Record<string, string> {
      const records: Record<string, string> = {};
      this.headers_.forEach((value, key) => {
        records[key] = value;
      });
      return records;
    }
  }