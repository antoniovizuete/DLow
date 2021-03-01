export type GenericType = { [key: string]: any };
export type DLowNode = {
  id: string;
  type: "task" | "flow";
  props: GenericType;
  children: DLowNode[];
};

export type DLowTask = DLowNode & {
  props: GenericType & {
    fn: (payload: GenericType) => Promise<GenericType>;
  };
};

export type DLowFlow = DLowNode & {
  props: GenericType & {
    initialPayload?: GenericType
  }
};
