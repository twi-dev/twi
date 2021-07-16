import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {isBoolean, isNumber} from "lodash"

import {User, UserStatuses} from "entity/User"
import {UserPageResult} from "api/type/user/UserPage"
import {UserRepo} from "repo/UserRepo"

import {setupConnection, cleanupConnection} from "__helper__/database"

import createFakeUsers from "__helper__/createFakeUsers"

import {createFakeContext} from "./__helper__/createFakeContext"
import {graphql} from "./__helper__/graphql"

const test = ava as TestInterface<{db: Connection, users: User[]}>

interface ViewerQueryResult {
  viewer: User
}

const viewerQuery = /* GraphQL */ `
  query {
    viewer {
      id
      email
    }
  }
`

interface UsersQueryVariables {
  page?: number
  limit?: number
}

interface UsersQueryResult {
  users: UserPageResult
}

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

interface UserQueryVariables {
  username: string
}

interface UserQueryResult {
  user: User
}

const userQuery = /* GraphQL */ `
  query GetUser($username: String!) {
    user(username: $username) {
      id
      login
    }
  }
`

test.before(async t => {
  const connection = await setupConnection()
  const userRepo = connection.getCustomRepository(UserRepo)

  const users = createFakeUsers(10)

  users.forEach(user => { user.status = UserStatuses.ACTIVE })

  t.context.users = await userRepo.save(users)
  t.context.db = connection
})

test("user returns a user by their email", async t => {
  const [{id, email}] = t.context.users

  const {user: actual} = await graphql<UserQueryResult, UserQueryVariables>({
    source: userQuery,
    variableValues: {
      username: email
    }
  })

  t.is(Number(actual.id), id)
})

test("user returns a user by their login", async t => {
  const [{id, login}] = t.context.users

  const {user: actual} = await graphql<UserQueryResult, UserQueryVariables>({
    source: userQuery,
    variableValues: {username: login}
  })

  t.is(Number(actual.id), id)
})

test("viewer returns loggen-in user", async t => {
  const [{id}] = t.context.users

  const {viewer: actual} = await graphql<ViewerQueryResult>({
    source: viewerQuery,
    contextValue: createFakeContext({session: {userId: id}})
  })

  t.is(Number(actual.id), id)
})

test("viewer result has the email field", async t => {
  const [{id, email}] = t.context.users

  const {viewer: actual} = await graphql<ViewerQueryResult>({
    source: viewerQuery,
    contextValue: createFakeContext({session: {userId: id}})
  })

  t.is(actual.email, email)
})

test("users returns correct page frame shape", async t => {
  const {users: actual} = await graphql<UsersQueryResult>({
    source: usersQuery
  })

  t.true(isNumber(actual.count))
  t.true(isNumber(actual.limit))
  t.true(isNumber(actual.offset))
  t.true(isNumber(actual.current))
  t.true(isBoolean(actual.hasNext))
  t.true(isNumber(actual.last))
  t.true(Array.isArray(actual.list))
})

test("users returns same limit values as in variables", async t => {
  const expected = 3

  const {
    users: actual
  } = await graphql<UsersQueryResult, UsersQueryVariables>({
    source: usersQuery,
    variableValues: {
      limit: expected
    }
  })

  t.is(actual.limit, expected)
})

test(
  "users returns true in a hasNext field when there's more pages left",

  async t => {
    const {
      users: actual
    } = await graphql<UsersQueryResult, UsersQueryVariables>({
      source: usersQuery,
      variableValues: {
        limit: 1
      }
    })

    t.true(actual.hasNext)
  }
)

test(
  "The value of the last page in users query depends on rows count and limit",

  async t => {
    const limit = 5

    // You can find the formula description in `api/type/abstract/Page.ts#last` method
    const expected = Math.ceil(t.context.users.length / limit)

    const {
      users: actual
    } = await graphql<UsersQueryResult, UsersQueryVariables>({
      source: usersQuery,
      variableValues: {
        limit
      }
    })

    t.is(actual.last, expected)
  }
)

test(
  "users returns the same current page number as in variables",

  async t => {
    const expected = 3

    const {
      users: actual
    } = await graphql<UsersQueryResult, UsersQueryVariables>({
      source: usersQuery,
      variableValues: {
        limit: 2,
        page: expected
      }
    })

    t.is(actual.current, expected)
  }
)

test(
  "The count field in users equals the total number of rows",

  async t => {
    const expected = await t.context.db.getCustomRepository(UserRepo).count()

    const {users: actual} = await graphql<UsersQueryResult>({
      source: usersQuery
    })

    t.is(actual.count, expected)
  }
)

test("users returns empty list when the page is out of range", async t => {
  const {
    users: actual
  } = await graphql<UsersQueryResult, UsersQueryVariables>({
    source: usersQuery,
    variableValues: {page: 2}
  })

  t.deepEqual(actual.list, [])
})

test.after.always(async () => {
  await cleanupConnection()
})
