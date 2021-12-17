import { Resource} from '@opentelemetry/resources';
import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';
import { Options } from "../../types";
import { BasicTracerProvider, ConsoleSpanExporter, SimpleSpanProcessor, SpanExporter} from '@opentelemetry/sdk-trace-base'
import { UnpluginContextMeta } from "unplugin";
import { OTLPTraceExporter } from "@opentelemetry/exporter-otlp-grpc";

export function setupOtelProvider(options: Options, meta: UnpluginContextMeta ): BasicTracerProvider {
    let provider = new BasicTracerProvider({
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: `${meta.framework}-build-otel`
        })
    })
    let spanExporter: SpanExporter;
    if (options.exporter === 'console') {
        spanExporter = new ConsoleSpanExporter();
    } else {
        spanExporter = new OTLPTraceExporter(options.otlpOptions);
    }
    const spanProcessor = new SimpleSpanProcessor(spanExporter);
    provider.addSpanProcessor(spanProcessor);
    provider.register()
    return provider;
}