import { DLow, Task } from "../core/dlow.ts"

type FlowProps = {
  name: string,
  //children: typeof Task | typeof Task[]
}

const Flow = ({name, ...children}: FlowProps) => {
  console.log("Flow", children);
  return <flow name={name} />
}

export default Flow;