import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {Service} from "typedi"

import {File} from "entity/File"

@Service()
@EntityRepository(File)
export class FileRepo extends Repository<File> {
  createAndSave(file: DeepPartial<File>) {
    return this.save(this.create(file))
  }
}

export default FileRepo
