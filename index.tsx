import { DLow } from "./dlow/core/DLow.ts";
import IntervalTask from "./dlow/std/IntervalTask.tsx";
import TimeoutTask from "./dlow/std/TimeoutTask.tsx";
import Flow from "./dlow/std/Flow.tsx";

const flow = (
  <Flow name="Flow" initialPayload={{ foo: "bar", count: 1 }}>
    <TimeoutTask
      millis={5_000}
      blocking={true}
      fn={({payload}) => {
        console.log("Execution delayed by 5s.");
        return {...payload, delayed: true}
      }}
      />
    <IntervalTask
      name="IntervalTask"
      millis={1_000}
      fn={(payload) => {
        console.log(payload.count);
        payload.count = payload.count + 1;
        payload.addedInterval = 1
      }}
    />
    <TimeoutTask
      millis={10_000}
      fn={({clearingInterval,...payload}) => {
        clearingInterval && clearingInterval();
        console.log(payload);
      }}
      />
  </Flow>
);

DLow.run(flow);
