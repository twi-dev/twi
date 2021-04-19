import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {Category} from "entity/Category"

@Service()
@EntityRepository(Category)
export class CategoryRepo extends Repository<Category> {}

export default CategoryRepo
