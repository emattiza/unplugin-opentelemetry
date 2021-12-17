import { OTLPTraceExporter } from '@opentelemetry/exporter-otlp-grpc'
import { defineConfig } from 'vite'
import Unplugin from '../src/vite'
import vue from '@vitejs/plugin-vue'

const otel = Unplugin;

export default defineConfig({
  plugins: [
    vue(),
    otel({
      exporter: 'console',
    }),
  ],
})
