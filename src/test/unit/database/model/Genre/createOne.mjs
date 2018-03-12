import test from "ava"

import pq from "proxyquire"

import faker from "faker"
import {spy} from "sinon"

import nano from "core/helper/util/nanoid"

import {createConnection, closeConnection} from "test/helper/database"

const nanoid = spy(nano)

const Genre = pq("../../../../../database/model/Genre", {
  "../../core/helper/util/nanoid": {
    default: nanoid
  }
}).default

test.before(async () => {
  await createConnection()

  await Genre.remove({})
})

test("Should just create a genre with given params", async t => {
  t.plan(2)

  const name = faker.name.findName()
  const color = "#353535"

  const genre = await Genre.createOne({name, color})

  t.is(genre.name, name)
  t.is(genre.color, color)
})

test("Should also generate a code for genre with Nano ID", async t => {
  t.plan(1)

  const name = faker.name.findName()
  const color = "#368e3a"

  const genre = await Genre.createOne({name, color})

  t.true(nanoid.returned(genre.code))
})

test.after(closeConnection)
