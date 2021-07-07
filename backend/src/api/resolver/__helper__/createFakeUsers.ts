import faker from "faker"

import {User, UserStatuses, UserRoles} from "entity/User"

/**
 * Creates given amount of fake users
 *
 * @param amount An amount of users to create
 */
function createFakeUsers(amount: number, generateId = false): User[] {
  return new Array(amount).fill(undefined).map<User>((_, index) => {
    const user = new User()
    const now = new Date()

    if (generateId) {
      user.id = index + 1
    }

    user.login = faker.internet.userName()
    user.email = faker.internet.email()
    user.password = faker.internet.password()
    user.status = UserStatuses.ACTIVE
    user.role = UserRoles.REGULAR
    user.createdAt = now
    user.updatedAt = now
    user.avatar = null

    return user
  })
}

export default createFakeUsers
