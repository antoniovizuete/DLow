import { DLowInitialPayloadType, DLowTaskFn } from "./common.types.ts";
import { DLowTask } from "./transpiled.types.ts";

// Intrinsic Elements Types
export interface DLowJSXElement {
  name?: string;
}

export interface DLowJSXFlow extends DLowJSXElement {
  initialPayload?: DLowInitialPayloadType;
  children: DLowTask | DLowTask[];
}

export interface DLowJSXTask extends DLowJSXElement {
  fn: DLowTaskFn;
}

export interface DLowJSXIntervalTask extends DLowJSXTask {
  millis: number;
}
