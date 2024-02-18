import { Ok, Result } from "../../src/index";
import { ClientOptions } from "../../src/index";

describe('ClientOptions', () => {
    it('instancing test', () => {
        const options = new ClientOptions();
        options
        .setEndpoint("http:localhost",3030)
        .setCredentials('token')
        .setFormat('binary')
        .addHeaders('key','value');

        expect(options.endpoint()).toBeDefined();
        expect(options.endpoint().baseUrl()).toBe("http:localhost");
        expect(options.endpoint().endpoint()).toBe("http:localhost:3030");
        expect(options.endpoint().port()).toBe(3030);
        expect(options.format()).toBe('binary');
        expect(options.credentials().key).toBe('Authorization');
        expect(options.credentials().value).toBe('Bearer token');
        expect(options.headers().size).toBe(1);
        expect(options).toBeDefined();

        expect(options.header('key')).toBe('value');
        expect(options.headerAsRecords()['key']).toBe('value');

        options.removeHeaders('key');
        expect(options.headers().size).toBe(0);

        options.clearHeaders();
        expect(options.headers().size).toBe(0);
    });
});

describe('ClientOptions', () => {
    it('instancing test no port', () => {
        const options = new ClientOptions();
        options
        .setEndpoint("http:localhost",80)
        .setCredentials('token')
        .setFormat('binary')
        .addHeaders('key','value');

        expect(options.endpoint()).toBeDefined();
        expect(options.endpoint().baseUrl()).toBe("http:localhost");
        expect(options.endpoint().endpoint()).toBe("http:localhost");
        expect(options.endpoint().port()).toBe(80);
        expect(options.format()).toBe('binary');
        expect(options.credentials().key).toBe('Authorization');
        expect(options.credentials().value).toBe('Bearer token');
        expect(options.headers().size).toBe(1);
        expect(options).toBeDefined();

        expect(options.header('key')).toBe('value');
        expect(options.headerAsRecords()['key']).toBe('value');

        options.removeHeaders('key');
        expect(options.headers().size).toBe(0);

        options.clearHeaders();
        expect(options.headers().size).toBe(0);
    });
});
