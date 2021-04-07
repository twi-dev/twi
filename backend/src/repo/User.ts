import {Repository, EntityRepository} from "typeorm"
import {Service} from "typedi"
import {hash} from "bcrypt"

import {User} from "entity/User"

const hashPassword = (password: string) => hash(password, 15)

@Service()
@EntityRepository()
class UserRepo extends Repository<User> {
  async createAndSave(user: Partial<User>) {
    user.password = await hashPassword(user.password)

    return this.save(this.create(user))
  }
}

export default UserRepo
