import ava, {TestInterface} from "ava"

import {Connection} from "typeorm"
import {graphql, GraphQLSchema} from "graphql"

import faker from "faker"

import {connect, disconnect} from "db"

import {UserRepo} from "repo/UserRepo"

import schema from "api/schema"

import AuthLogInInput from "api/input/auth/LogIn"
import AuthSignUpInput from "api/input/auth/SignUp"

import createFakeUsers from "./__helper__/createFakeUsers"

const test = ava as TestInterface<{db: Connection, schema: GraphQLSchema}>

test.before(async t => {
  t.context.db = await connect()
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
    contextValue: {
      session: {
        userId: null
      }
    }
  })

  t.falsy(errors)

  const user = await userRepo.findOne(data!.authSignUp.id)

  t.truthy(user)

  await userRepo.remove(user!)
})

test("authSignUp sets up a session", async t => {
  const userRepo = t.context.db.getCustomRepository(UserRepo)

  const input: AuthSignUpInput = {
    email: faker.internet.email(),
    login: faker.internet.userName(),
    password: faker.internet.password()
  }

  const session = {
    userId: null
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
    contextValue: {
      session
    }
  })

  t.falsy(errors)

  const user = await userRepo.findOne(data!.authSignUp.id)

  t.is(session.userId, user!.id)

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
    contextValue: {
      session: {
        userId: null
      }
    },
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

  const session = {
    userId: null
  }

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
    contextValue: {
      session
    },
    variableValues: {
      credentials: {
        username: email,
        password
      }
    }
  })

  t.falsy(errors)
  t.is(session.userId, user.id)

  await userRepo.remove(user)
})

test.after(async () => {
  await disconnect()
})
