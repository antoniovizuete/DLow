import { DLow, DLowFlow} from "./dlow/core/DLow.ts";
//import { flow } from "./examples/TimeTasks.tsx";



const flow: DLowFlow = (
  <flow name="flow">
    <task name="task" fn={() => console.log("task!!")} />
  </flow>
);

const flow1: DLowFlow = (
  <flow name="flow">
    <interval-task
      fn={() => console.log("interval task!!")}
      millis={1000}
    ></interval-task>
    <task  fn={() => console.log("task")} />
  </flow>
);
DLow.run(flow1);
