import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {Tag} from "entity/Tag"

@Service()
@EntityRepository()
class TagRepo extends Repository<Tag> {}

export default TagRepo
