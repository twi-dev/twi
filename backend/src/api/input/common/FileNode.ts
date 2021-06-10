import {InputType, Field} from "type-graphql"
import {BodyFile} from "then-busboy"

import File from "api/scalar/common/File"

import Node from "./Node"

@InputType()
class FileNodeInput extends Node {
  @Field(() => File)
  file!: BodyFile
}

export default FileNodeInput
