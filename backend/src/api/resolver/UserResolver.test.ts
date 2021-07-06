import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {graphql} from "graphql"

import schema from "api/schema"

import {User} from "entity/User"
import {UserRepo} from "repo/UserRepo"

import {connect, disconnect} from "db"

import createFakeUsers from "./__helper__/createFakeUsers"

const test = ava as TestInterface<{db: Connection, users: User[]}>

test.before(async t => {
  const connection = await connect()
  const userRepo = connection.getCustomRepository(UserRepo)

  const users = createFakeUsers(10)

  t.context.users = await userRepo.save(users)
  t.context.db = connection
})

test("user query returns a user by their email", async t => {
  const [{id, email, login}] = t.context.users

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      query GetUser($email: String!) {
        user(emailOrLogin: $email) {
          id
          login
        }
      }
    `,
    variableValues: {
      email
    }
  })

  t.falsy(errors)
  t.deepEqual(data!.user, {id: String(id), login})
})

test("user query returns a user by their login", async (t) => {
  const [{id, login}] = t.context.users

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      query GetUser($login: String!) {
        user(emailOrLogin: $login) {
          id
          login
        }
      }
    `,
    variableValues: {
      login
    }
  })

  t.falsy(errors)
  t.deepEqual(data!.user, {id: String(id), login})
})

test("users query returns correct page frame format", async t => {
  const users = t.context.users.map(({id, login}) => ({id: String(id), login}))

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      {
        users {
          count
          limit
          offset
          current
          hasNext
          last
          list {
            id
            login
          }
        }
      }
    `
  })

  t.falsy(errors)
  t.deepEqual(data!.users, {
    count: users.length,
    limit: 10,
    offset: 0,
    current: 1,
    hasNext: false,
    last: 1,
    list: users
  })
})

test("users query returns same limit values as in variables", async t => {
  const expected = 3

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      query GetUsers($limit: Int) {
        users(limit: $limit) {
          limit
        }
      }
    `,
    variableValues: {
      limit: expected
    }
  })

  t.falsy(errors)

  t.is(data!.users.limit, expected)
})

test(
  "users query returns true in a hasNext field when there's more pages left",
  async t => {
    const {data, errors} = await graphql({
      schema,
      source: /* GraphQL */ `
        query GetUsers($limit: Int) {
          users(limit: $limit) {
            hasNext
          }
        }
      `,
      variableValues: {
        limit: 1
      }
    })

    t.falsy(errors)

    t.true(data!.users.hasNext)
  }
)

test.after(async t => {
  const userRepo = t.context.db.getCustomRepository(UserRepo)

  await userRepo.remove(t.context.users)
  await disconnect()
})
