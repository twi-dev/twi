import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"

import {Category} from "entity/Category"

@Service()
@EntityRepository(Category)
class CategoryRepo extends Repository<Category> {}

export default CategoryRepo
