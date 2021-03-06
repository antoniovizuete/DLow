import { DLowInitialPayloadType, DLowPayload, DLowTaskFn } from "./common.types.ts";
import { PropsWithChildren, DLowElement } from "./dlow-internal.types.ts";

// Props types of transpiled JSX.IntrinsicElements
type DLowFlowPropsType = PropsWithChildren<
  DLowPayload & {
    initialPayload: DLowInitialPayloadType;
  }
>;

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
