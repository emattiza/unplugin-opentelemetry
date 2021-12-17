import { exit } from 'process';
import { createUnplugin } from 'unplugin';
import { setupOtelProvider } from './otel/utils/setup-otel';
import { Options } from './types';
import { context, Context, Span } from '@opentelemetry/api';
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-base'
import { trace } from '@opentelemetry/api';

export default createUnplugin<Options>((plugin_options, meta) => {
  let buildSpan: Span;
  let currentContext: Context | undefined = undefined;
  if (plugin_options) {
    setupOtelProvider(plugin_options, meta); // Need to use plugin_options to configure otel
  } else {
    console.warn("Plugin needs to be called with suitable options. Please define these in your *.config.(ts|js) and see documentation for current options")
    exit(1);
  }
  let tracer = trace.getTracer(`${meta.framework}-build-opentelemetry`);
  return {
    name: `${meta.framework}-build-opentelemetry`,
    buildStart() {
      buildSpan = tracer.startSpan("build", undefined, currentContext);
      buildSpan.addEvent("build output test");
    },
    resolveId(id, importer) {
      const resolveIdCtx = trace.setSpan(context.active(), buildSpan)
      const resolveIdSpan = tracer.startSpan('resolve_id', undefined, resolveIdCtx)
      resolveIdSpan.setAttribute("resolve.id", `${id}`)
      resolveIdSpan.setAttribute("resolve.importer", `${importer}`)
      resolveIdSpan.end()
      return null
    },
    buildEnd() {
      buildSpan.end();
    },

  }
})
