import { DLowTask, DLowElement, DLow } from "../DLow.ts";

type Success<T> = [true, T];
type Failure = [false, any];
type Result<T> = Success<T> | Failure;
type Validator<T> = (x: any) => Result<T>;

type Value<T extends Validator<any>> = Extract<ReturnType<T>, [true, any]>[1];

const configure = <V extends Record<keyof V, Validator<any>>>(
  validators: V
) => {
  return <K extends keyof V>(key: K) => {
    return (x: any): x is Value<V[K]> => {
      const validator = validators[key];
      const [valid] = validator(x);
      return valid;
    };
  };
};

const factory = configure({
  task: (x: any) =>
    "props" in x && "fn" in x.props && typeof x.props.fn === "function"
      ? [true, x]
      : [false, "Invalid!"],
});

const isTask = factory("task");

const task: DLowElement = {
  type: "task",
  props: {},
} 

if(isTask(task)) {
  task.props.fn()
}