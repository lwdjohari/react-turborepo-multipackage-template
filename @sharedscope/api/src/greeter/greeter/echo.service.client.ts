// @generated by protobuf-ts 2.9.3 with parameter generate_dependencies
// @generated from protobuf file "greeter/echo.service.proto" (package "tretacore", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { EchoService } from "./echo.service";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { EchoResponse } from "./echo.service";
import type { EchoRequest } from "./echo.service";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service tretacore.EchoService
 */
export interface IEchoServiceClient {
    /**
     * @generated from protobuf rpc: Echo(tretacore.EchoRequest) returns (tretacore.EchoResponse);
     */
    echo(input: EchoRequest, options?: RpcOptions): UnaryCall<EchoRequest, EchoResponse>;
}
/**
 * @generated from protobuf service tretacore.EchoService
 */
export class EchoServiceClient implements IEchoServiceClient, ServiceInfo {
    typeName = EchoService.typeName;
    methods = EchoService.methods;
    options = EchoService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: Echo(tretacore.EchoRequest) returns (tretacore.EchoResponse);
     */
    echo(input: EchoRequest, options?: RpcOptions): UnaryCall<EchoRequest, EchoResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<EchoRequest, EchoResponse>("unary", this._transport, method, opt, input);
    }
}
