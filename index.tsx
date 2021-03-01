import { DLow } from "./dlow/core/dlow.ts";
import { DLowNode } from "./dlow/types/types.ts";

const taskExcutable = (name: string, payload: object) => {
  console.log("Prueba " + name);
  console.log("Payload", payload);
  return {
    ...payload,
    name
  };
};

const flow: DLowNode = (
  <flow name="Flow" initialPayload={{ initDate: new Date().toUTCString()}} >
    {["task1", "task2"].map(e => <task name={e} fn={async (payload) => taskExcutable(e, payload)} />)}
    {["task3", "task4"].map(e => <task name={e} fn={async (payload) => taskExcutable(e, payload)} />)}
    <task name="task5" fn={async (payload) => {
      setTimeout(() => console.log("Task5") ,1000)
      return {...payload, fin: true}
    }} />
    <task name="task6" fn={async (p) => taskExcutable("final", p)}>
      Children?
    </task>
  </flow>
);

DLow.run(flow);
