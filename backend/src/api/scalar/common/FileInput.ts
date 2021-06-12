import {GraphQLScalarType as Scalar, GraphQLError} from "graphql"
import {isBodyFile, BodyFile} from "then-busboy"

const FileInput = new Scalar({
  name: "FileInput",
  description: "The `File` scalar type is the representation of "
    + "spec-compatible files from browsers",

  parseValue(value: unknown): BodyFile {
    if (!isBodyFile(value)) {
      throw new GraphQLError("Invalid FileInput value.")
    }

    return value
  },

  parseLiteral(): never {
    throw new GraphQLError("Literal is not supported for FileInput type")
  },

  serialize(): never {
    throw new GraphQLError("FileInput serialization is not supported")
  }
})

export default FileInput
