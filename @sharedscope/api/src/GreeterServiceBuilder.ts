import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { ClientOptions } from "@sharedscope/core"

import { EchoServiceClientModule } from "./index";
import { Err, Ok, Result } from "@sharedscope/core";


export enum GreeterClientType {
    UNKNOWN = 0,
    ECHO_SVC_CLIENT = 1,
}

export class GreeterServiceBuilder {

    static getServiceClient<T>(clientType: GreeterClientType, arg: ClientOptions): Result<T, Error>{
        let client: T = undefined as T;
        let transport: GrpcWebFetchTransport;
        const is_have_endpoint = arg.endpoint() != null;
        const is_have_credentials = arg.credentials() != null;
        const is_has_additional_headers = arg.headers().size > 0;

        if (!is_have_endpoint) {
            return new Err (new Error('Endpoint is required!'));
        }

        if (is_have_credentials && is_has_additional_headers) {

            transport = new GrpcWebFetchTransport({
                baseUrl: arg.endpoint()!.endpoint(),
                format: arg.format(),
                headers: {
                    ...arg.headerAsRecords(),
                    [arg.credentials()!.key] :[arg.credentials()!.value]
                }
            });


        } else if (is_have_credentials) {
            transport = new GrpcWebFetchTransport({
                baseUrl: arg.endpoint()!.endpoint(),
                format: arg.format(),
                headers: {
                    [arg.credentials()!.key] :[arg.credentials()!.value]
                }
            });


        } else {
            transport = new GrpcWebFetchTransport({
                baseUrl: arg.endpoint()!.endpoint(),
                format: arg.format(),
                headers: arg.headerAsRecords()
            });

        }

        if (clientType === GreeterClientType.ECHO_SVC_CLIENT) {
            client = new EchoServiceClientModule.EchoServiceClient(transport) as T;
        }

        return new Ok(client as T);
    }
}
