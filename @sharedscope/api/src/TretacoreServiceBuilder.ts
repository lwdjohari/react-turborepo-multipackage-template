import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport";
import { ClientOptions } from "@sharedscope/core"

import { EchoServiceClientModule } from "../src/index";
import { Err, Ok, Result } from "@sharedscope/core";


export enum TretaClientType {
    UNKNOWN = 0,
    ECHO_SVC_CLIENT = 1,
}

export class TretacoreServiceBuilder {

    static getServiceClient<T>(clientType: TretaClientType, arg: ClientOptions): Result<T, Error>{
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

        if (clientType === TretaClientType.ECHO_SVC_CLIENT) {
            client = new EchoServiceClientModule.EchoServiceClient(transport) as T;
        }

        return new Ok(client as T);
    }
}
