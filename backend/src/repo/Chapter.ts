import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {Chapter} from "entity/Chapter"

@Service()
@EntityRepository()
class ChapterRepo extends Repository<Chapter> {}

export default ChapterRepo
