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
    return this._fs.getURL(key)
  }

  @FieldResolver(() => Int, {description: "Returns size of the file in bytes."})
  async size(@Root() {key}: File): Promise<number> {
    return this._fs.getSize(key)
  }
}

export default FileResolver
