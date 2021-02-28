import { DLow } from "../core/dlow.ts"

type TaskProps = {
  name: string
}

const Task = ({ name, ...children }: TaskProps) => {
  console.log(`Creating ${name}`);
  return {
    type: "task",
    name,
    ...children
  };
};
export default Task;