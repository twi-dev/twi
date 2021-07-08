import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {graphql} from "graphql"

import schema from "api/schema"

import {User} from "entity/User"
import {UserRepo} from "repo/UserRepo"

import {setupConnection, cleanupConnection} from "__helper__/database"

import createFakeUsers from "__helper__/createFakeUsers"

const test = ava as TestInterface<{db: Connection, users: User[]}>

const usersQuery = /* GraphQL */ `
  query GetUsers($page: Int, $limit: Int) {
    users(page: $page, limit: $limit) {
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

test.before(async t => {
  const connection = await setupConnection()
  const userRepo = connection.getCustomRepository(UserRepo)

  const users = createFakeUsers(10)

  t.context.users = await userRepo.save(users)
  t.context.db = connection
})

test("user returns a user by their email", async t => {
  const [{id, email, login}] = t.context.users

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      query GetUser($email: String!) {
        user(username: $email) {
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

test("user returns a user by their login", async (t) => {
  const [{id, login}] = t.context.users

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      query GetUser($login: String!) {
        user(username: $login) {
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

test("viewer returns loggen-in user", async t => {
  const [{id}] = t.context.users

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      {
        viewer {
          id
        }
      }
    `,
    contextValue: {
      session: {
        userId: id
      }
    }
  })

  t.falsy(errors)

  t.is(data!.viewer.id, String(id))
})

test("users returns correct page frame format", async t => {
  const users = t.context.users.map(({id, login}) => ({id: String(id), login}))

  const {data, errors} = await graphql({
    schema,
    source: usersQuery
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

test("users returns same limit values as in variables", async t => {
  const expected = 3

  const {data, errors} = await graphql({
    schema,
    source: usersQuery,
    variableValues: {
      limit: expected
    }
  })

  t.falsy(errors)

  t.is(data!.users.limit, expected)
})

test(
  "users returns true in a hasNext field when there's more pages left",

  async t => {
    const {data, errors} = await graphql({
      schema,
      source: usersQuery,
      variableValues: {
        limit: 1
      }
    })

    t.falsy(errors)

    t.true(data!.users.hasNext)
  }
)

test(
  "The value of the last page in users query depends on rows count and limit",

  async t => {
    // You can find the formula description in `api/type/abstract/Page.ts#last` method
    const limit = 5
    const expected = Math.ceil(t.context.users.length / limit)

    const {data, errors} = await graphql({
      schema,
      source: usersQuery,
      variableValues: {
        limit
      }
    })

    t.falsy(errors)
    t.is(data!.users.last, expected)
  }
)

test(
  "users returns the same current page number as in variables",

  async t => {
    const expected = 3

    const {data, errors} = await graphql({
      schema,
      source: usersQuery,
      variableValues: {
        limit: 2,
        page: expected
      }
    })

    t.falsy(errors)

    t.is(data!.users.current, expected)
  }
)

test(
  "The count field in users equals the total number of rows",

  async t => {
    const expected = await t.context.db.getCustomRepository(UserRepo).count()

    const {data, errors} = await graphql({schema, source: usersQuery})

    t.falsy(errors)

    t.is(data!.users.count, expected)
  }
)

test("users returns empty list when the page is out of range", async t => {
  const {data, errors} = await graphql({
    schema,
    source: usersQuery,
    variableValues: {
      page: 2
    }
  })

  t.falsy(errors)
  t.deepEqual(data!.users.list, [])
})

test.after(async t => {
  const userRepo = t.context.db.getCustomRepository(UserRepo)

  await userRepo.remove(t.context.users)
  await cleanupConnection()
})
