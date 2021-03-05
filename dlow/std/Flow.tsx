import { v4 } from "https://deno.land/std@0.88.0/uuid/mod.ts";
import { DLow } from "../core/DLow.ts";
import { DLowComponent } from "../core/types.ts";

type FlowProps = {
  name?: string;
  initialPayload?: Record<string, unknown>;
};

const Flow: DLowComponent<FlowProps> = ({ name, initialPayload, children }) => {
  const flowProps = {
    name,
    initialPayload: {
      ...initialPayload,
      __executionId: v4.generate(),
    },
  };
  return <flow {...flowProps}>{children}</flow>;
};

export default Flow;
