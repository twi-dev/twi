import UnwrapPromise from "./UnwrapPromise"

type UnwrapMethodsReturnType<T extends object> = {
  [key in keyof T]: T[key] extends (...args: any[]) => any
    ? UnwrapPromise<ReturnType<T[key]>>
    : T[key]
}

export default UnwrapMethodsReturnType
