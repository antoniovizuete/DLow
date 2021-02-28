export type DLowNode = {
  type: "task" | "flow",
  props: AnyObjectType,
  children: DLowNode[]
};

export type AnyObjectType = {
  [key: string]: any
}

export type DLowTask = DLowNode & {
  props: {
    fn: Function
  }
}
