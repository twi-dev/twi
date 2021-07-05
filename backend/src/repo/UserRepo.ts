import {cpus} from "os"

import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {hash, verify, argon2id} from "argon2"
import {Service} from "typedi"

import {User} from "entity/User"

// TODO: Tweak params later for better balance between time & security
export const hashPassword = (password: string) => hash(password, {
  type: argon2id,
  parallelism: cpus().length
})

@Service()
@EntityRepository(User)
export class UserRepo extends Repository<User> {
  async createAndSave(user: DeepPartial<User>): Promise<User> {
    // user.password = await hashPassword(user.password!)
    return this.save(this.create(user))
  }

  findByEmailOrLogin(emailOrLogin: string): Promise<User | undefined> {
    return this.findOne({
      where: [{email: emailOrLogin}, {login: emailOrLogin}]
    })
  }

  /**
   * Checks if given password is valid for the user
   *
   * @param password A password to compare with
   */
  comparePassword(user: User, password: string): Promise<boolean> {
    return verify(user.password, password)
  }
}
