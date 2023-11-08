import type {TRPCError} from "@trpc/server"
import {isObjectLike} from "lodash-es"

interface NuxtTrpcErrorData {
  code: TRPCError["code"]
  httpStatus: number
  stack: string
}

export type NuxtTrpcError = Omit<ReturnType<typeof createError>, "data"> & {
  data: NuxtTrpcErrorData
}

export function isNuxtTrpcError(input: MaybeRef<unknown>): input is NuxtTrpcError {
  const value = unref(input) as NuxtTrpcError

  if (!isObjectLike(value) || Array.isArray(value)) {
    return false
  }

  if (!isNuxtError(value)) {
    return false
  }

  return "code" in value.data && "httpStatus" in value.data
}
