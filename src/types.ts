import { OTLPExporterConfigNode } from "@opentelemetry/exporter-otlp-grpc/build/src/types";

export interface Options {
  // define your plugin options here
  exporter?: 'otlp' | 'console',
  otlpOptions?: OTLPExporterConfigNode,
}
