import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {GraphQLSchema} from "graphql"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {UserRepo} from "repo/UserRepo"

import {User} from "entity/User"

import AuthLogInInput from "api/input/auth/LogIn"
import AuthSignUpInput from "api/input/auth/SignUp"

import createFakeUsers from "__helper__/createFakeUsers"

import {createFakeContext} from "./__helper__/createFakeContext"
import {graphql} from "./__helper__/graphql"

const test = ava as TestInterface<{db: Connection, schema: GraphQLSchema}>

interface AuthSignUpVariables {
  user: AuthSignUpInput
}

interface AuthSignUpResult {
  authSignUp: User
}

const authSignUp = /* GraphQL */ `
  mutation AuthSignUp($user: AuthSignUpInput!) {
    authSignUp(user: $user) {
      id
      email
      login
    }
  }
`

interface AuthLogInVariables {
  credentials: AuthLogInInput
}

interface AuthLogInResult {
  authLogIn: User
}

const authLogIn = /* GraphQL */ `
  mutation AuthLogIn($credentials: AuthLogInInput!) {
    authLogIn(credentials: $credentials) {
      id
      email
      login
    }
  }
`

interface AuthLogOutResult {
  authLogOut: number
}

test.before(async t => {
  t.context.db = await setupConnection()
})

test("authSignUp creates a new user", async t => {
  const [{email, login, password}] = createFakeUsers(1)

  const {
    authSignUp: actual
  } = await graphql<AuthSignUpResult, AuthSignUpVariables>({
    source: authSignUp,
    variableValues: {user: {email, login, password}}
  })

  t.is(actual.email, email)
  t.is(actual.login, login)
})

test("authSignUp sets up a session", async t => {
  const [{email, login, password}] = createFakeUsers(1)

  const context = createFakeContext()

  const {
    authSignUp: actual
  } = await graphql<AuthSignUpResult, AuthSignUpVariables>({
    source: authSignUp,
    variableValues: {user: {email, login, password}},
    contextValue: context
  })

  t.is(Number(actual.id), context.session.userId)
})

test("authLogIn returns logged in user.", async t => {
  const [user] = createFakeUsers(1)
  const {email, password} = user

  await t.context.db.getCustomRepository(UserRepo).save(user)

  const {
    authLogIn: actual
  } = await graphql<AuthLogInResult, AuthLogInVariables>({
    source: authLogIn,
    variableValues: {credentials: {username: email, password}}
  })

  t.is(Number(actual.id), user.id)
})

test("authLogIn creates a session.", async t => {
  const [user] = createFakeUsers(1)
  const {email, password} = user

  await t.context.db.getCustomRepository(UserRepo).save(user)

  const context = createFakeContext()

  await graphql<unknown, AuthLogInVariables>({
    source: authLogIn,
    contextValue: context,
    variableValues: {credentials: {username: email, password}}
  })

  t.is(context.session.userId, user.id)
})

test("authLogOut destroys current session", async t => {
  const [user] = createFakeUsers(1)

  await t.context.db.getCustomRepository(UserRepo).save(user)

  const context = createFakeContext({session: {userId: user.id}})

  const {authLogOut: actual} = await graphql<AuthLogOutResult>({
    source: /* GraphQL */ ` mutation { authLogOut } `,
    contextValue: context
  })

  t.is(context.session, null)
  t.is(Number(actual), user.id)
})

test.after(async () => {
  await cleanupConnection()
})
