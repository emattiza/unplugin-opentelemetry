import * as api from '@opentelemetry/api';
import {
    W3CTraceContextPropagator,
    TRACE_PARENT_HEADER
} from '@opentelemetry/core'

export function getContext() {
    if (process.env.TRACEPARENT) {
        const propagator = new W3CTraceContextPropagator();
        return propagator.extract(
            api.context.active(),
            {
                [TRACE_PARENT_HEADER]: process.env.TRACEPARENT
            },
            api.defaultTextMapGetter
        )
    } else {
        return undefined;
    }
}
