import { v4 } from "https://deno.land/std@0.88.0/uuid/mod.ts";
import { DLow } from "../core/DLow.ts";
import { GenericType, TaskFn } from "../core/types.ts";

type IntervalTaskProps = {
  name?: string;
  millis: number;
  fn: (payload: GenericType) => void;
};

const IntervalTask = ({ millis, fn, name }: IntervalTaskProps) => {
  const taskFn: TaskFn = (payload) => {
    const interval = setInterval(() => fn(payload), millis);
    const clearingInterval = () => clearInterval(interval);
    return { ...payload, clearingInterval };
  };

  return <task name={name ? name : v4.generate()} fn={taskFn} />;
};

export default IntervalTask;
