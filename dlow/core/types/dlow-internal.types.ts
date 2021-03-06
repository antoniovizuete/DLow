// DLow Types
type DLowText = string | number;
type DLowChild = DLowElement | DLowText;

// deno-lint-ignore no-empty-interface
interface DLowNodeArray extends Array<DLowNode> {}
type DLowFragment = {} | DLowNodeArray;
type JSXElementConstructor<P> = (props: P) => DLowElement | null;

export type PropsWithChildren<P> = P & { children?: DLowNode };
export type DLowNode = DLowChild | DLowFragment | boolean | null | undefined;
export interface DLowElement<
  P = any,
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> =
    | keyof JSX.IntrinsicElements
    | JSXElementConstructor<any>
> {
  type: T;
  props: P;
}