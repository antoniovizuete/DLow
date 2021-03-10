import { DLowFlow, DLowPayload, DLowTask, DLowTaskFn, DLowElement } from "./DLow.ts";

let payload: DLowPayload = {
  __executionId: "",
};

export const getPayload = () => payload;
export const setPayload = (
  newPayload: DLowPayload,
) => (payload = { ...payload, ...newPayload });

export const run = async (flow: DLowFlow) => {
  validateFlow(flow);

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


export const validateFlow = (flow: DLowFlow) => {
  const children = flow.props.children
  if (children) {
    if (children.some(child => !isDLowTask(child))){
      throw Error(`Flow is not valid, some children are not Task.\n ${JSON.stringify(flow)}`);
    }
  }
}

const isDLowTask = (element: DLowElement<any>): element is DLowTask => {
  return 'fn' in element.props;
}