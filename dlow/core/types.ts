// DLow Section
export type DLowTaskFn = (
  payload?: DLowPayload
) => DLowPayload | Promise<DLowPayload> | void;
export type DLowPayload = { [key: string]: any } & {
  __executionId?: string;
};

export type DLowInitialPayloadType = Exclude<DLowPayload, "__executionId">;

export type DLowFlow = DLowElement<
  PropsWithChildren<
    DLowPayload & {
      initialPayload: DLowInitialPayloadType;
    }
  >,
  "flow"
>;

export type DLowTask = DLowElement<
  DLowPayload & {
    fn: DLowTaskFn;
  },
  "task"
>;

// JSX Section
export interface DLowComponent<P = {}> {
  (props: PropsWithChildren<P>): DLowElement<any, any>;
  displayName?: string;
}

export type DLowText = string | number;

export type DLowChild = DLowElement | DLowText;

// deno-lint-ignore no-empty-interface
export interface DLowNodeArray extends Array<DLowNode> {}

export type DLowFragment = {} | DLowNodeArray;

export type DLowNode = DLowChild | DLowFragment | boolean | null | undefined;

export type PropsWithChildren<P> = P & { children?: DLowNode };

export type JSXElementConstructor<P> = (props: P) => DLowElement | null;

export interface DLowElement<
  P = any,
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> =
    | keyof JSX.IntrinsicElements
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
}
