export type GenericType = { [key: string]: any };
export type TaskFn = (payload: PayloadType) => (PayloadType | Promise<PayloadType>);
export type PayloadType = GenericType & {
  __executionId: string
}
export type DLowType = {
  id: string;
  type: "task" | "flow";
  props: GenericType;
  children: DLowType[];
};

export type DLowTask = DLowType & {
  props: GenericType & {
    fn: TaskFn
  };
};

export type DLowFlow = DLowType & {
  props: GenericType & {
    initialPayload: PayloadType
  }
};
