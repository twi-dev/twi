import {InputType, Field} from "type-graphql"

import Node from "./Node"
import File from "./File"

@InputType()
class FileNodeInput extends Node {
  @Field(() => File)
  file!: File
}

export default FileNodeInput
