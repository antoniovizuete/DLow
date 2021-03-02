import { v4 } from "https://deno.land/std@0.88.0/uuid/mod.ts";
import { DLow } from "../core/DLow.ts";
import { GenericType, TaskFn, PayloadType } from "../core/types.ts";

type TimeoutTaskProps = {
  name?: string;
  millis: number;
  fn: (payload: GenericType) => (GenericType | void);
  blocking?: boolean;
};

const TimeoutTask = ({ name, millis, fn, blocking = false }: TimeoutTaskProps) => {

  const taskFnNonBlocking: TaskFn = (payload) => {
    setTimeout(() => fn(payload), millis);
    return { ...payload };
  };
  const blockFor = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const taskBlocking: TaskFn = async (payload: PayloadType) => {
    await blockFor(millis);
    return { ...payload, ...fn(payload) } as PayloadType
  }

  const taskFn: TaskFn = blocking ? taskBlocking : taskFnNonBlocking; 

  return <task name={name ? name : v4.generate()} fn={taskFn} />;
};

export default TimeoutTask;
