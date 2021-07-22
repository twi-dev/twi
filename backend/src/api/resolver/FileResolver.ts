import {join} from "path"

import {Resolver, FieldResolver, Root, Int} from "type-graphql"
import {stat} from "fs-extra"

import {File} from "entity/File"

import {FILES_ROOT} from "helper/util/file"

@Resolver(() => File)
class FileResolver {
  @FieldResolver(() => Int, {description: "Returns size of the file in bytes."})
  async size(@Root() {key}: File): Promise<number> {
    return stat(join(FILES_ROOT, key)).then(({size}) => size)
  }
}

export default FileResolver
