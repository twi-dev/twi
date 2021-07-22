import ava, {TestInterface} from "ava"

import {HttpError} from "http-errors"
import {isBoolean, isNumber} from "lodash"

import {User, UserStatuses} from "entity/User"
import {UserPageResult} from "api/type/user/UserPage"

import {setupConnection, cleanupConnection} from "__helper__/database"

import createFakeUsers from "__helper__/createFakeUsers"

import {
  withDatabase,
  WithDatabaseMacro,
  DatabaseContext
} from "../../__macro__/withDatabaseContext"
import {graphql} from "./__helper__/graphql"
import {createFakeContext} from "./__helper__/createFakeContext"

import OperationError from "./__helper__/OperationError"

interface TestContext {
  users: User[]
}

type Macro = WithDatabaseMacro<TestContext>

const test = ava as TestInterface<DatabaseContext & TestContext>

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
  const userRepo = connection.em.getRepository(User)

  const users = createFakeUsers(10)

  users.forEach(user => { user.status = UserStatuses.ACTIVE })

  await userRepo.persistAndFlush(users)

  t.context.users = users
  t.context.db = connection
})

test<Macro>(
  "user returns a user by their email",

  withDatabase,

  async t => {
    const [{id, email}] = t.context.users

    const {user: actual} = await graphql<UserQueryResult, UserQueryVariables>({
      source: userQuery,
      variableValues: {
        username: email
      }
    })

    t.is(Number(actual.id), id)
  }
)

test<Macro>(
  "user returns a user by their login",

  withDatabase,

  async t => {
    const [{id, login}] = t.context.users

    const {user: actual} = await graphql<UserQueryResult, UserQueryVariables>({
      source: userQuery,
      variableValues: {username: login}
    })

    t.is(Number(actual.id), id)
  }
)

test<Macro>("viewer returns loggen-in user", withDatabase, async t => {
  const [{id}] = t.context.users

  const {viewer: actual} = await graphql<ViewerQueryResult>({
    source: viewerQuery,
    contextValue: createFakeContext({session: {userId: id}})
  })

  t.is(Number(actual.id), id)
})

test<Macro>("viewer result has the email field", withDatabase, async t => {
  const [{id, email}] = t.context.users

  const {viewer: actual} = await graphql<ViewerQueryResult>({
    source: viewerQuery,
    contextValue: createFakeContext({session: {userId: id}})
  })

  t.is(actual.email, email)
})

test<Macro>(
  "viewer throws an error if current user was not found",

  withDatabase,

  async t => {
    const trap = () => graphql<never>({
      source: viewerQuery,
      contextValue: createFakeContext({session: {userId: 42}})
    })

    const {graphQLErrors} = await t.throwsAsync<OperationError>(trap)
    const [{originalError}] = graphQLErrors

    t.is((originalError as HttpError).statusCode, 401)
  }
)

test(
  "users returns correct page frame shape",

  withDatabase,

  async t => {
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
  }
)

test<Macro>(
  "users returns same limit values as in variables",

  withDatabase,

  async t => {
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
  }
)

test(
  "users returns true in a hasNext field when there's more pages left",

  withDatabase,

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

test<Macro>(
  "The value of the last page in users query depends on rows count and limit",

  withDatabase,

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

test<Macro>(
  "users returns the same current page number as in variables",

  withDatabase,

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

test<Macro>(
  "The count field in users equals the total number of rows",

  withDatabase,

  async t => {
    const expected = await t.context.db.em.getRepository(User).count()

    const {users: actual} = await graphql<UsersQueryResult>({
      source: usersQuery
    })

    t.is(actual.count, expected)
  }
)

test<Macro>(
  "users returns empty list when the page is out of range",

  withDatabase,

  async t => {
    const {
      users: actual
    } = await graphql<UsersQueryResult, UsersQueryVariables>({
      source: usersQuery,
      variableValues: {page: 2}
    })

    t.deepEqual(actual.list, [])
  }
)

test.after.always(async () => {
  await cleanupConnection()
})
