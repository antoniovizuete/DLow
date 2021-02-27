export namespace DLow {
  export const createElement = (
    tag: string | Function,
    props: object,
    ...children: any[]
  ) => {
    if (typeof tag === "function") {
      return tag({ ...props, children });
    } else {
      return [tag, props, children];
    }
  };

  export const createFragment = ({children}: {children: any[]}) => {
    return children;
  };
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: {
        id?: string;
        style?: {};
      };
      task: {
        id?: string;
        name?: string;
      };
    }
  }
}
