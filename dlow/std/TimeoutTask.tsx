import { DLow } from "../core/DLow.ts";
import { DLowComponent, DLowTaskFn } from "../core/types.ts";

type TimeoutTaskProps = {
  name?: string;
  millis: number;
  fn: DLowTaskFn;
  blocking?: boolean;
};

const TimeoutTask: DLowComponent<TimeoutTaskProps> = ({
  name,
  millis,
  fn,
  blocking = false,
}) => {
  const taskFnNonBlocking: DLowTaskFn = (payload) => {
    setTimeout(() => fn(payload), millis);
  };

  const taskBlocking: DLowTaskFn = async (payload) => {
    await new Promise((resolve) => setTimeout(resolve, millis));
    return { ...fn(payload) };
  };

  const taskFn: DLowTaskFn = blocking ? taskBlocking : taskFnNonBlocking;

  return <task name={name} fn={taskFn} />;
};

export default TimeoutTask;
