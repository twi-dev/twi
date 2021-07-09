import {graphql as exec, GraphQLArgs} from "graphql"

import schema from "api/schema"

import {createFakeContext, FakeContext} from "./createFakeContext"

type UnknownObject = Record<string, unknown>

type ArgsWithoutSchema = Omit<GraphQLArgs, "schema">

export interface Args<V, C, R> extends ArgsWithoutSchema {
  variableValues?: V
  contextValue?: C
  rootValue?: R
}

export async function graphql<
  TResult = unknown,
  TVariables = UnknownObject,
  TContext extends FakeContext = FakeContext,
  TRoot = unknown
>(args: Args<TVariables, TContext, TRoot>): Promise<TResult> {
  const {data, errors} = await exec({
     ...args,

     schema,

     contextValue: args.contextValue || createFakeContext()
  })

  if (errors) {
    throw errors
  }

  return data as TResult
}
