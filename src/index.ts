import { NodeSDK } from '@opentelemetry/sdk-node';
import { InputOptions } from 'rollup'
import { createUnplugin } from 'unplugin'
import { Context } from 'vm';
import { setupOtelSdk } from './otel/utils/setup-otel';
import { Options } from './types'

export default createUnplugin<Options>((plugin_options, meta) => {
  let otel_sdk: {sdk: NodeSDK, context?: Context | undefined};
  console.log(meta.framework);
  if (plugin_options) {
    otel_sdk = setupOtelSdk(plugin_options); // Need to use plugin_options to configure otel
    otel_sdk.sdk.start()
  } else {
    console.warn("Plugin needs to be called with suitable options. Please define these in your *.config.(ts|js) and see documentation for current options")
  }
  return {
    name: 'unplugin-opentelemetry',
    buildStart() {
    },
    buildEnd() {
    }
  }
})
