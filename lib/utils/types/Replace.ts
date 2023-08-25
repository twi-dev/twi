export type Replace<TLeft, TRight> = Omit<TLeft, keyof TRight> & TRight
