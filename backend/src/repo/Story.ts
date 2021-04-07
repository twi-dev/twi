import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {Story} from "entity/Story"

@Service()
@EntityRepository()
class StoryRepo extends Repository<Story> {}

export default StoryRepo
