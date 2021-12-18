import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc'
import { defineConfig } from 'vite'
import otel from 'unplugin-opentelemetry/vite';
import vue from '@vitejs/plugin-vue'
import { Metadata, credentials } from '@grpc/grpc-js'

const metadata = new Metadata();
const traceExporter = new OTLPTraceExporter({
  url: "grpc://localhost:4317/",
  credentials: credentials.createSsl(),
  metadata
});

export default defineConfig({
  plugins: [
    vue(),
    otel({
      exporter: 'otlp',
      otlpOptions: traceExporter
    }),
  ],
})
