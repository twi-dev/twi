import {graphql as exec, GraphQLArgs} from "graphql"

import schema from "api/schema"

import {createFakeContext, FakeContext} from "./createFakeContext"

type UnknownObject = Record<string, unknown>

type ArgsWithoutSchema = Omit<GraphQLArgs, "schema">

/**
 * GraphQL operation arguments.
 */
export interface Args<V, C, R> extends ArgsWithoutSchema {
  variableValues?: V
  contextValue?: C
  rootValue?: R
}

/**
 * Better typed graphql function.
 * Unlike the original function, this one will throw errors if any occurs rather then just returning them.
 * It also does have application schema already builtin.
 * The only value it returns is the operation result.
 *
 * @param args Arguments to execute graphql function with.
 */
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
