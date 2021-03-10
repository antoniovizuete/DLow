import { DLowInitialPayloadType, DLowPayload, DLowTaskFn } from "./common.types.ts";
import { PropsWithRequiredChildrenOfType } from "./dlow-internal.types.ts";

// Props types of transpiled JSX.IntrinsicElements
type DLowFlowPropsType = PropsWithRequiredChildrenOfType<
  DLowPayload & {
    initialPayload: DLowInitialPayloadType;
  }
,DLowTask[]>;

type DLowTaskPropsType = DLowPayload & {
  fn: DLowTaskFn;
};

type DLowIntervalTaskPropsType = DLowTaskPropsType & {
  millis: number;
};

// Types of transpiled JSX.IntrinsicElements
export type DLowFlow = DLowElement<DLowFlowPropsType, "flow">;
export type DLowTask = DLowElement<DLowTaskPropsType, "task">;
export type DLowIntervalTask = DLowElement<
  DLowIntervalTaskPropsType,
  "interval-task"
>;

// The most generic
type JSXElementConstructor<P> = (props: P) => DLowElement | null;
export interface DLowElement<
  P = unknown,
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<unknown> =
    | keyof JSX.IntrinsicElements
    | JSXElementConstructor<unknown>
> {
  type: T;
  props: P;
}
