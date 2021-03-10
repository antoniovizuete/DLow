import { DLowElement } from "./transpiled.types.ts";

// DLow Types
type DLowText = string | number;
type DLowChild = DLowElement | DLowText;

// deno-lint-ignore no-empty-interface
interface DLowNodeArray extends Array<DLowNode> {}
type DLowFragment = {} | DLowNodeArray;

type WithChildrenOfType<T> = {children?: T}

export type PropsWithRequiredChildrenOfType<P, T> = P & Required<WithChildrenOfType<T>>
export type PropsWithChildrenOfType<P, T> = P & WithChildrenOfType<T>
export type PropsWithChildren<P> = PropsWithChildrenOfType<P, DLowNode>;
export type DLowNode = DLowChild | DLowFragment | boolean | null | undefined;