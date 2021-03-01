import { v4 } from "https://deno.land/std@0.88.0/uuid/mod.ts";
import { DLowNode, DLowFlow, DLowTask, GenericType } from "../types/types.ts";

export namespace DLow {
  type CreateElType = (
    tag: string | Function,
    props: GenericType,
    ...children: any[]
  ) => DLowNode;

  export const createElement: CreateElType = (tag, props, ...children) => {
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

  const executeTasks = async (tasks: DLowTask[], payload: GenericType) => {
    for (const task of tasks) {
      payload = await executeTask(task, payload);
    }
    return payload;
  };

  const executeTask = async (task: DLowTask, payload: GenericType) => {
    const result = await task.props.fn(payload);
    return result;
  };

  export const run = async (flow: DLowFlow) => {
    let payload: GenericType = flow.props?.initialPayload || {};
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
      flow: Flow;
      task: Task;
    }
    interface Flow {
      name?: string;
      initialPayload?: GenericType;
    }
    interface Task {
      id?: string;
      name?: string;
      fn?: (payload: GenericType) => Promise<GenericType>;
      children?: never;
    }
  }
}
