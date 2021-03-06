import { createElement, createFragment } from "./jsx.ts";
import { getPayload, run, setPayload } from "./engine.ts";

export * from "./types/index.ts";

export const DLow = {
  createElement,
  createFragment,
  run,
  getPayload,
  setPayload,
};
