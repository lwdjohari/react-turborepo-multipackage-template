import { ClientOptions } from "@sharedscope/core";
import { TretacoreServiceBuilder, TretaClientType } from "../../src/index";
import { EchoServiceClientModule as esc } from "../../src/index";

describe('TretacoreServiceBuilder', () => {
    it('should return error if no endpoint is provided', () => {


        const client = TretacoreServiceBuilder
            .getServiceClient<esc.EchoServiceClient>(TretaClientType.ECHO_SVC_CLIENT, new ClientOptions());
        expect(client.isErr()).toBe(true);
    });
});

describe('TretacoreServiceBuilder', () => {
    it('should return instance of EchoClient if endpoint is provided', () => {
        const options = new ClientOptions()
            .setEndpoint("http:localhost")
            .setFormat('binary');

        const client = TretacoreServiceBuilder
            .getServiceClient<esc.EchoServiceClient>(TretaClientType.ECHO_SVC_CLIENT, options);
        expect(client.isOk()).toBe(true);
        expect(client.unwrap()).toBeDefined();


    });
});

describe('TretacoreServiceBuilder', () => {
    it('should return instance of EchoClient if endpoint is provided with port', () => {
        const options = new ClientOptions()
            .setEndpoint("http:localhost", 6060)
            .setFormat('binary');

        const client = TretacoreServiceBuilder
            .getServiceClient<esc.EchoServiceClient>(TretaClientType.ECHO_SVC_CLIENT, options);
        expect(client.isOk()).toBe(true);
        expect(client.unwrap()).toBeDefined();
    });
});

describe('TretacoreServiceBuilder', () => {
    it('should return instance when credentials set', () => {
        const options = new ClientOptions()
            .setEndpoint("http:localhost", 6060)
            .setFormat('binary')
            .setCredentials('token');
        const client = TretacoreServiceBuilder
            .getServiceClient<esc.EchoServiceClient>(TretaClientType.ECHO_SVC_CLIENT, options);
        expect(client.isOk()).toBe(true);
        expect(client.unwrap()).toBeDefined();
    });
});

describe('TretacoreServiceBuilder', () => {
    it('should return instance when headers set', () => {
        const options = new ClientOptions()
            .setEndpoint("http:localhost", 6060)
            .setFormat('binary')
            .addHeaders('key', 'value');
        const client = TretacoreServiceBuilder
            .getServiceClient<esc.EchoServiceClient>(TretaClientType.ECHO_SVC_CLIENT, options);
        expect(client.isOk()).toBe(true);
        expect(client.unwrap()).toBeDefined();
    });
});

describe('TretacoreServiceBuilder', () => {
    it('should return instance when headers and credentials set', () => {
        const options = new ClientOptions()
            .setEndpoint("http:localhost", 6060)
            .setFormat('binary')
            .addHeaders('key', 'value')
            .setCredentials('token');
        const client = TretacoreServiceBuilder
            .getServiceClient<esc.EchoServiceClient>(TretaClientType.ECHO_SVC_CLIENT, options);
        expect(client.isOk()).toBe(true);
        expect(client.unwrap()).toBeDefined();
    });
});

