import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc'
import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'
import { OTLPExporterConfigNode } from '@opentelemetry/exporter-otlp-grpc/build/src/types';
import * as grpc from '@grpc/grpc-js'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      exporter: 'console',
      otlpOptions: {metadata: new grpc.Metadata()}
    }),
  ],
})
