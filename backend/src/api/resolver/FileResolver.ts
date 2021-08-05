import {URL} from "url"

import {Resolver, FieldResolver, Root, Int} from "type-graphql"
import {Service, Inject} from "typedi"

import {File} from "entity/File"

import {FileStorage} from "helper/file/FileStorage"

@Service()
@Resolver(() => File)
class FileResolver {
  @Inject()
  private _fs!: FileStorage

  @FieldResolver(() => String, {
    description: "Full address of the file on static server."
  })
  async url(@Root() {key}: File): Promise<string> {
    // TODO: Move this logic into the file storage once I come up with its implementation (if I will decide to make this abstraction)
    return new URL(key, process.env.SERVER_ADDRESS).toString()
  }

  @FieldResolver(() => Int, {description: "Returns size of the file in bytes."})
  async size(@Root() {key}: File): Promise<number> {
    return this._fs.getSize(key)
  }
}

export default FileResolver
