import {DLowNode, AnyObjectType} from "../types/DLowNode.ts";
export namespace DLow {
  type CreateElType = (
    tag: string | Function,
    props: AnyObjectType,
    ...children: any[]
  ) => DLowNode;
  
  export const createElement: CreateElType = (
    tag,
    props,
    ...children
  ) => {
    if (typeof tag === "function") {
      return tag({ ...props, children });
    } else {
      return {
        type: tag,
        props,
        children
      };
    }
  };

  export const createFragment = ({children}: {children: any[]}) => {
    return children;
  };
}

export { default as Flow } from "../components/Flow.tsx";
export { default as Task } from "../components/Task.tsx";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      flow: Flow;
      task: Task;
    }
    interface Flow {
      name?: string,
      initialPayload?: object
    }
    interface Task {
      id?: string;
      name?: string;
      fn?: (payload: object) => object;
      children?: never;
    }
  }
}
