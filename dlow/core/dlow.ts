import { v4 } from "https://deno.land/std@0.88.0/uuid/mod.ts";
import {
  DLowType,
  DLowFlow,
  DLowTask,
  GenericType,
  PayloadType,
  TaskFn
} from "./types.ts";

export namespace DLow {
  type CreateElType = (
    tag: string | Function,
    props: GenericType,
    ...children: any[]
  ) => DLowType;

  export const createElement: CreateElType = (tag, props, ...children) => {
    //console.log(tag, props, children);
    if (typeof tag === "function") {
      return tag({ ...props, children });
    } else {
      return {
        id: v4.generate(),
        type: tag,
        props,
        children,
      };
    }
  };

  export const createFragment = ({ children }: { children: any[] }) => {
    return children;
  };

  const executeTasks = async (tasks: DLowTask[], payload: PayloadType) => {
    for (const task of tasks) {
      payload = await executeTask(task, payload);
    }
    return payload;
  };

  const executeTask = async (task: DLowTask, payload: PayloadType) => {
    const result = await executeAsync(task.props.fn, payload);
    return result;
  };

  const executeAsync = async (
    fn: TaskFn,
    payload: PayloadType
  ): Promise<PayloadType> => {
    return new Promise((resolve, reject) => {
      try {
        const result = fn(payload);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  };

  export const run = async (flow: DLowFlow) => {
    let payload: PayloadType = {
      ...(flow.props?.initialPayload || {}),
      __executionId:v4.generate()
    };
    
    for (const child of flow.children) {
      const tasks: DLowTask[] = Array.isArray(child)
        ? child
        : ([child] as DLowTask[]);
      payload = await executeTasks(tasks, payload);
    }
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      flow: {
        name?: string;
        initialPayload?: GenericType;
      };
      task: {
        id?: string;
        name: string;
        fn: TaskFn;
        children?: never;
      };
    }
  }
}
