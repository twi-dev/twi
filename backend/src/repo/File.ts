import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {File} from "entity/File"

@Service()
@EntityRepository(File)
export class FileRepo extends Repository<File> {}

export default FileRepo
