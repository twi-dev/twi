import uTest, {TestInterface} from "ava"

import {Container} from "typedi"
import {buildSchema} from "type-graphql"
import {graphql, GraphQLSchema} from "graphql"
import {ConnectionManager} from "typeorm"
import {pick} from "lodash"

import {User} from "entity/User"

import {UserRepo} from "repo/UserRepo"
import {FileRepo} from "repo/FileRepo"

import authChecker from "auth/checker"

import createFakeUsers from "./__helper__/createFakeUsers"

import UserResolver from "./UserResolver"

const test = uTest as TestInterface<{schema: GraphQLSchema}>

const users: User[] = createFakeUsers(10)

test.before(async t => {
  class FakeUserRepo {
    async findAndCount() {
      return [users, users.length]
    }

    async findOne(id: number) {
      return users.find(user => user.id === id)
    }

    async findByEmailOrLogin(emailOrLogin: string) {
      return users.find(
        user => user.email === emailOrLogin || user.login === emailOrLogin
      )
    }
  }

  class NoopRepo {}

  Container.set(ConnectionManager, {
    has: () => true,

    get: () => ({
      getCustomRepository(t: unknown) {
        if (t === UserRepo) {
          return new FakeUserRepo()
        }

        if (t === FileRepo) {
          return new NoopRepo()
        }

        return undefined
      }
    })
  })

  t.context.schema = await buildSchema({
    container: Container,
    resolvers: [UserResolver],
    authChecker
  })
})

test("Resolves a user by their email", async t => {
  const {id, login, email} = pick<User>(users[0], ["id", "login", "email"])

  const {data} = await graphql({
    schema: t.context.schema,
    source: `
      query GetUser($emailOrLogin: String!) {
        user(emailOrLogin: $emailOrLogin) {
          id
          login
        }
      }
    `,
    variableValues: {
      emailOrLogin: email
    }
  })

  t.deepEqual(data!.user, {id: String(id), login})
})

test("Resolves a user by their login", async t => {
  const {id, login} = pick<User>(users[0], ["id", "login"])

  const {data} = await graphql({
    schema: t.context.schema,
    source: `
      query GetUser($emailOrLogin: String!) {
        user(emailOrLogin: $emailOrLogin) {
          id
          login
        }
      }
    `,
    variableValues: {
      emailOrLogin: login
    }
  })

  t.deepEqual(data!.user, {id: String(id), login})
})

test("Resolves all users", async t => {
  const expected = users
    .map(user => pick(user, ["id", "login"]))
    .map(({id, login}) => ({id: String(id), login}))

  const {data} = await graphql({
    schema: t.context.schema,
    source: `
      {
        users {
          list {
            id
            login
          }
        }
      }
    `
  })

  t.deepEqual(data!.users.list, expected)
})

test("Resolves current user based on session", async t => {
  const {id, login} = users[0]

  const {data} = await graphql({
    schema: t.context.schema,
    source: `
      {
        viewer {
          id
          login
        }
      }
    `,
    contextValue: {
      session: {
        userId: id
      }
    }
  })

  t.deepEqual(data!.viewer, {id: String(id), login})
})
