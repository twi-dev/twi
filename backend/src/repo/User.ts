import {cpus} from "os"

import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {hash, argon2id} from "argon2"
import {Service} from "typedi"

import {User} from "entity/User"

// TODO: Tweak params later for better balance between time & security
const hashPassword = (password: string) => hash(password, {
  type: argon2id,
  parallelism: cpus().length
})

@Service()
@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async createAndSave(user: DeepPartial<User>): Promise<User> {
    user.password = await hashPassword(user.password)

    return this.save(this.create(user))
  }

  findByEmailOrLogin(emailOrLogin: string): Promise<User> {
    return this.findOne({where: [{email: emailOrLogin}, {login: emailOrLogin}]})
  }
}

export default UserRepo
