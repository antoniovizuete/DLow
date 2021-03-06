import { PropsWithChildren, DLowElement } from "./dlow-internal.types.ts"

// Custom tags interface
export interface DLowComponent<P = {}> {
  (props: PropsWithChildren<P>): DLowElement<any, any>;
  displayName?: string;
}
