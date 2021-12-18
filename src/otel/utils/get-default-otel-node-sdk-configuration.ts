import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc';
import { Resource } from '@opentelemetry/resources';
import { NodeSDKConfiguration } from '@opentelemetry/sdk-node';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
  SpanExporter,
} from '@opentelemetry/sdk-trace-base';
import { Options } from '../../types';

export function getDefaultOtelNodeSdkConfiguration(
  options: Options
): Partial<NodeSDKConfiguration> {
  let spanExporter: SpanExporter;
  if (options.exporter === 'console') {
    spanExporter = new ConsoleSpanExporter();
  } else {
    spanExporter = new OTLPTraceExporter(options.otlpOptions);
  }
  const spanProcessor = new BatchSpanProcessor(spanExporter);
  return {
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: 'unplugin-opentelemetry-build',
    }),
    traceExporter: spanExporter,
    spanProcessor,
  };
}