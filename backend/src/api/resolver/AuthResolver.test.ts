import ava, {TestInterface} from "ava"

import {pick} from "lodash"
import {Connection} from "typeorm"
import {graphql, GraphQLSchema} from "graphql"

import faker from "faker"

import {setupConnection, cleanupConnection} from "__helper__/database"

import {UserRepo} from "repo/UserRepo"

import schema from "api/schema"

import AuthLogInInput from "api/input/auth/LogIn"
import AuthSignUpInput from "api/input/auth/SignUp"

import createFakeUsers from "./__helper__/createFakeUsers"

import {createFakeContext} from "./__helper__/createFakeContext"

const test = ava as TestInterface<{db: Connection, schema: GraphQLSchema}>

test.before(async t => {
  t.context.db = await setupConnection()
})

test("authSignUp creates a new user", async t => {
  const userRepo = t.context.db.getCustomRepository(UserRepo)

  const input: AuthSignUpInput = {
    email: faker.internet.email(),
    login: faker.internet.userName(),
    password: faker.internet.password(),
  }

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      mutation AuthSignUp($user: AuthSignUpInput!) {
        authSignUp(user: $user) {
          id
        }
      }
    `,
    variableValues: {
      user: input
    },
    contextValue: createFakeContext()
  })

  t.falsy(errors)

  const user = await userRepo.findOne(data!.authSignUp.id)

  t.truthy(user)
  t.deepEqual(
    pick(user!, ["email", "login"]),

    {
      email: input.email,
      login: input.login
    }
  )

  await userRepo.remove(user!)
})

test("authSignUp sets up a session", async t => {
  const userRepo = t.context.db.getCustomRepository(UserRepo)

  const input: AuthSignUpInput = {
    email: faker.internet.email(),
    login: faker.internet.userName(),
    password: faker.internet.password()
  }

  const context = createFakeContext()

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      mutation AuthSignUp($user: AuthSignUpInput!) {
        authSignUp(user: $user) {
          id
        }
      }
    `,
    variableValues: {
      user: input
    },
    contextValue: context
  })

  t.falsy(errors)

  const user = await userRepo.findOne(data!.authSignUp.id)

  t.truthy(user)
  t.is(context.session.userId, user!.id)

  await userRepo.remove(user!)
})

test("authLogIn returns logged in user.", async t => {
  const [user] = createFakeUsers(1, false)

  const userRepo = t.context.db.getCustomRepository(UserRepo)

  const input: AuthLogInInput = {
    username: user.email,
    password: user.password
  }

  await userRepo.save(user)

  const {data, errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      mutation AuthLogIn($credentials: AuthLogInInput!) {
        authLogIn(credentials: $credentials) {
          id
          login
        }
      }
    `,
    contextValue: createFakeContext(),
    variableValues: {
      credentials: input
    }
  })

  t.falsy(errors)
  t.deepEqual(data!.authLogIn, {
    id: String(user.id),
    login: user.login
  })

  await userRepo.remove(user)
})

test("authLogIn creates a session.", async t => {
  const [user] = createFakeUsers(1, false)
  const {email, password} = user

  const context = createFakeContext()

  const userRepo = t.context.db.getCustomRepository(UserRepo)

  await userRepo.save(user)

  const {errors} = await graphql({
    schema,
    source: /* GraphQL */ `
      mutation AuthLogIn($credentials: AuthLogInInput!) {
        authLogIn(credentials: $credentials) {
          id
          login
        }
      }
    `,
    contextValue: context,
    variableValues: {
      credentials: {
        username: email,
        password
      }
    }
  })

  t.falsy(errors)
  t.is(context.session.userId, user.id)

  await userRepo.remove(user)
})

test.after(async () => {
  await cleanupConnection()
})
