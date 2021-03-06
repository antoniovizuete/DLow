import { DLowFlow, DLowPayload, DLowTask, DLowTaskFn } from "./DLow.ts";

let payload: DLowPayload = {
  __executionId: "",
};

export const getPayload = () => payload;
export const setPayload = (
  newPayload: DLowPayload,
) => (payload = { ...payload, ...newPayload });

export const run = async (flow: DLowFlow) => {
  setPayload(flow.props.initialPayload);
  if (Array.isArray(flow.props.children)) {
    for (const child of flow.props.children) {
      const tasks: DLowTask[] = Array.isArray(child)
        ? (child as DLowTask[])
        : ([child] as DLowTask[]);
      payload = await executeTasks(tasks, payload);
    }
  }
};

const executeTasks = async (tasks: DLowTask[], payload: DLowPayload) => {
  for (const task of tasks) {
    payload = await executeTask(task, payload);
  }
  return payload;
};

const executeTask = async (task: DLowTask, payload: DLowPayload) => {
  const result = await executeAsync(task.props.fn, payload);
  return result;
};

const executeAsync = (
  fn: DLowTaskFn,
  payload: DLowPayload,
): Promise<DLowPayload> => {
  return new Promise((resolve, reject) => {
    try {
      const result = fn(payload) || payload;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
