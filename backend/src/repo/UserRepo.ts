import {cpus} from "os"

import {EntityRepository} from "@mikro-orm/mysql"
import {hash, verify, argon2id} from "argon2"
import {Service} from "typedi"

import {User} from "entity/User"

/**
 * Hash user password using argon2
 */
export const hashPassword = (password: string) => hash(password, {
  type: argon2id,
  parallelism: cpus().length
})

@Service()
export class UserRepo extends EntityRepository<User> {
  /**
   * Finds a user by their email or login
   */
  async findOneByEmailOrLogin(emailOrLogin: string) {
    return this.findOne({$or: [{login: emailOrLogin}, {email: emailOrLogin}]})
  }

  /**
   * Checks if given password is valid for the user
   *
   * @param user A user to check the password for
   * @param password A password to verify
   */
  async comparePassword(user: User, password: string): Promise<boolean> {
    return verify(user.password, password)
  }
}
