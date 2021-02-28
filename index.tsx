import { DLow } from "./dlow/core/dlow.ts";
import {DLowNode} from "./dlow/types/DLowNode.ts";

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
    {["task1", "task2"].map(e => <task name={e} fn={(payload) => taskExcutable(e, payload)} />)}
    {["task3", "task4"].map(e => <task name={e} fn={(payload) => taskExcutable(e, payload)} />)}
    <task name="task5" fn={(payload) => {
      setTimeout(() => console.log("Task5") ,1000)
      return {...payload, fin: true}
    }} />
    <task name="task6" fn={(p) => p}>
      Children?
    </task>
  </flow>
);

let payload: object = flow.props?.initialPayload || {};
flow.children.forEach((e:any) => {
  console.log("Engine: ", e)
  if(Array.isArray(e)) { 
    e.forEach(s => {
      const result = s.props.fn(payload);
      payload = {...result};
    })
  } else if (typeof e === 'object') {
    const result = e.props.fn(payload);
    payload = {...result};
  }
});
console.log(payload);
