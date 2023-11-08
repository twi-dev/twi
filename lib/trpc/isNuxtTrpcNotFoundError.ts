import {isNuxtTrpcError} from "./isNuxtTrpcError.js"

export const isNuxtTrpcNotFoundError = (
  input: MaybeRef<unknown>
) => isNuxtTrpcError(input) && unref(input).data.code === "NOT_FOUND"
