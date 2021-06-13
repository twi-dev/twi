import {InputType, Field} from "type-graphql"
import {BodyFile} from "then-busboy"

import FileInput from "api/input/common/FileInput"

import Node from "./Node"

@InputType()
class FileNodeInput extends Node {
  @Field(() => FileInput)
  file!: BodyFile
}

export default FileNodeInput
