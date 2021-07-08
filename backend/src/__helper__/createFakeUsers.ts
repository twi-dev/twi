import faker from "faker"

import {User, UserRoles, UserStatuses} from "entity/User"

import createFakeEntities from "./createFakeEntities"

const createFakeUsers = (
  amount: number,
  generateId: boolean = false
): User[] => createFakeEntities<User>(
  User,
  amount,

  user => {
    user.login = faker.internet.userName()
    user.email = faker.internet.email()
    user.password = faker.internet.password()
    user.status = UserStatuses.ACTIVE
    user.role = UserRoles.REGULAR
  },

  generateId
)

export default createFakeUsers
