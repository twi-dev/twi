import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {Tag} from "entity/Tag"

@Service()
@EntityRepository(Tag)
export class TagRepo extends Repository<Tag> { }
