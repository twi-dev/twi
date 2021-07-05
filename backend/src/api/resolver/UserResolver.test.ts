import test from "ava"

import faker from "faker"

import {Container} from "typedi"
import {ConnectionManager} from "typeorm"

import {User, UserRoles, UserStatuses} from "entity/User"

import UserResolver from "./UserResolver"

const users: User[] = [
  {
    id: 1,
    email: faker.internet.email(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
    role: UserRoles.REGULAR,
    status: UserStatuses.ACTIVE,
    avatar: null,
    createdAt: new Date(faker.time.recent()),
    updatedAt: new Date(faker.time.recent()),
    get dates() {
      return {
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }
  },
  {
    id: 1,
    email: faker.internet.email(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
    role: UserRoles.REGULAR,
    status: UserStatuses.ACTIVE,
    avatar: null,
    createdAt: new Date(faker.time.recent()),
    updatedAt: new Date(faker.time.recent()),
    get dates() {
      return {
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }
  },
  {
    id: 1,
    email: faker.internet.email(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
    role: UserRoles.REGULAR,
    status: UserStatuses.ACTIVE,
    avatar: null,
    createdAt: new Date(faker.time.recent()),
    updatedAt: new Date(faker.time.recent()),
    get dates() {
      return {
        createdAt: this.createdAt,
        updatedAt: this.updatedAt
      }
    }
  }
]

test.before(() => {
  class FakeUserRepo {
    async findByEmailOrLogin(emailOrLogin: string) {
      return users.find(
        user => user.email === emailOrLogin || user.login === emailOrLogin
      )
    }
  }

  Container.set(ConnectionManager, {
    has: () => true,

    get: () => ({
      getCustomRepository() {
        return new FakeUserRepo()
      }
    })
  })
})

test("Resolves a user by their email", async t => {
  const [expected] = users

  const resolver = Container.get(UserResolver)

  const actual = await resolver.user(expected.email)

  t.deepEqual(actual, expected)
})

// test("Resolves all users", async t => {
//   const resolver = Container.get(UserResolver)
// })
