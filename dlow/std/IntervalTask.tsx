import { DLow } from "../core/DLow.ts";
import { DLowComponent, DLowTaskFn } from "../core/types.ts";

type IntervalTaskProps = {
  name?: string;
  millis: number;
  fn: DLowTaskFn;
};

const IntervalTask: DLowComponent<IntervalTaskProps> = (
  { millis, fn, name },
) => {
  const taskFn: DLowTaskFn = (payload) => {
    const interval = setInterval(() => fn(payload), millis);
    const clearingInterval = () => clearInterval(interval);
    return { ...payload, clearingInterval };
  };

  return <task name={name} fn={taskFn} />;
};

export default IntervalTask;
