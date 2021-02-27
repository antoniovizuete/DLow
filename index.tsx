import { DLow } from "./DLow.ts";

const Flow = () => (
  <>
    <Task name="First task"></Task>
    <Task name="Second task"></Task>
  </>
);

const Task = ({ name }: { name: string }) => {
  console.log(`Creating ${name}`);
  return <task name={name} />;
};

//(<Flow />).forEach((el: any) => console.log(el));
console.log(JSON.stringify(<Flow />, null, 2));
