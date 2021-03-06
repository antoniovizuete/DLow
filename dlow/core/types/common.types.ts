// Common types
export type DLowTaskFn = (
  payload?: DLowPayload
) => DLowPayload | Promise<DLowPayload> | void;

export type DLowPayload = { [key: string]: any } & {
  __executionId?: string;
};

export type DLowInitialPayloadType = Exclude<DLowPayload, "__executionId">;
