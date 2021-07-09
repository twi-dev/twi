import faker from "faker"

import {User, UserRoles, UserStatuses} from "entity/User"

import createFakeEntities from "./createFakeEntities"

const createFakeUsers = (
  amount: number,
  generateId: boolean = false
): User[] => createFakeEntities(
  User,
  amount,

  user => {
    const firstName = faker.name.findName()
    const lastName = faker.name.lastName()

    user.login = faker.internet.userName(firstName, lastName)
    user.email = faker.internet.email(firstName, lastName)
    user.password = faker.internet.password()
    user.status = UserStatuses.ACTIVE
    user.role = UserRoles.REGULAR
  },

  generateId
)

export default createFakeUsers
