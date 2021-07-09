import {GraphQLError} from "graphql"

class OperationError extends Error {
  readonly graphQLErrors: readonly GraphQLError[]

  constructor(graphQLErrors: readonly GraphQLError[]) {
    const message = graphQLErrors.reduce<string>((prev, next) => (
      `${prev}${next}\n`
    ), "")

    super(message)

    this.graphQLErrors = graphQLErrors
  }
}

export default OperationError
