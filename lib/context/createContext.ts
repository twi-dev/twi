import {inject, provide} from "vue"
import {nanoid} from "nanoid"

interface CreateContextResult<TData> {
  readonly key: string
  provideContext(data: TData): void
  useContext(): TData
}

export function createContext<TData>(): CreateContextResult<TData> {
  const key = nanoid()

  function provideContext(data: TData): void {
    provide(key, data)
  }

  function useContext(): TData {
    const data = inject<TData>(key)

    if (data === undefined) {
      throw new Error("Could not find data within context")
    }

    return data
  }

  return Object.freeze({key, provideContext, useContext})
}
