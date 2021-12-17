import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc'
import { defineConfig } from 'vite'
import Unplugin from '../src/vite'
import vue from '@vitejs/plugin-vue'
import { Metadata, credentials } from '@grpc/grpc-js'

const otel = Unplugin;
const metadata = new Metadata();
metadata.set("x-honeycomb-team", process.env.HONEYCOMB_API_KEY ? process.env.HONEYCOMB_API_KEY : "");
metadata.set("x-honeycomb-dataset", "unplugin-test")
const traceExporter = new OTLPTraceExporter({
  url: "grpc://api.honeycomb.io:443/",
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
