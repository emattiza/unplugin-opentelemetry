import { Context } from "@opentelemetry/api";
import { NodeSDK } from "@opentelemetry/sdk-node";
import { Options } from "../../types";
import { getDefaultOtelNodeSdkConfiguration } from "./get-default-otel-node-sdk-configuration";

export function setupOtelSdk(options: Options): { sdk: NodeSDK, context?: Context } {
    const defaultConfiguration = getDefaultOtelNodeSdkConfiguration(options);
    return { sdk: new NodeSDK(defaultConfiguration), context: undefined }
}