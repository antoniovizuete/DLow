import {
  DLowComponent,
  DLowElement,
  DLowNode,
  DLowTaskFn,
  DLowJSXFlow,
  DLowJSXTask,
  DLowJSXIntervalTask,
} from "./DLow.ts";

export function createElement<P extends {}>(
  type: DLowComponent<P> | string,
  props: P,
  ...children: DLowNode[]
): DLowElement<any, any> {
  if (typeof type === "function") return type({ ...props, children });
  const childs = children.flat().filter((c) => typeof c === "object");
  return {
    type,
    props: {
      ...props,
      children: childs,
    },
  };
}

export function createFragment({ children }: { children: DLowNode[] }) {
  children;
}

declare global {
  // deno-lint-ignore no-namespace
  namespace JSX {
    // deno-lint-ignore no-empty-interface
    interface Element extends DLowElement<any, any> {}
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicElements {
      flow: DLowJSXFlow;
      task: DLowJSXTask;
      "interval-task": DLowJSXIntervalTask;
    }
  }
}
