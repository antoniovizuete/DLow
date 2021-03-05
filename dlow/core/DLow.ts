import { createElement, createFragment } from "./jsx.ts";
import { getPayload, run, setPayload } from "./engine.ts";

export * as Types from "./types.ts";

export const DLow = {
  createElement,
  createFragment,
  run,
  getPayload,
  setPayload,
};
