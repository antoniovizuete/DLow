import { PropsWithChildren } from "./dlow-internal.types.ts"
import { DLowElement } from "./transpiled.types.ts"

// Custom tags interface
export interface DLowComponent<P = {}> {
  (props: PropsWithChildren<P>): DLowElement<any, any>;
  displayName?: string;
}
