import {join} from "path"
import {URL} from "url"

import {Resolver, FieldResolver, Root, Int} from "type-graphql"
import {Service} from "typedi"
import {stat} from "fs-extra"

import {File} from "entity/File"

import {FILES_ROOT} from "helper/util/file"

@Service()
@Resolver(() => File)
class FileResolver {
  @FieldResolver(() => String, {
    description: "Full address of the file on static server."
  })
  async url(@Root() {key}: File): Promise<string> {
    // TODO: Move this logic into the file storage once I come up with its implementation (if I will decide to make this abstraction)
    return new URL(key, process.env.SERVER_ADDRESS).toString()
  }

  @FieldResolver(() => Int, {description: "Returns size of the file in bytes."})
  async size(@Root() {key}: File): Promise<number> {
    return stat(join(FILES_ROOT, key)).then(({size}) => size)
  }
}

export default FileResolver
