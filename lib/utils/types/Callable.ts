export type Callable<TResult = any, TArgs extends any[] = any[]> = (
  ...args: TArgs
) => TResult
