import test from "ava"

import pq from "proxyquire"

import faker, {system} from "faker"
import {spy} from "sinon"

import nano from "core/helper/util/nanoid"

import {createConnection, closeConnection} from "test/helper/database"

const nanoid = spy(nano)

const Character = pq("../../../../../database/model/Character", {
  "../../core/helper/util/nanoid": {
    default: nanoid
  }
}).default

test.before(createConnection)

test("Should just create a character with given params", async t => {
  t.plan(2)

  const name = faker.name.findName()
  const pic = system.fileName()

  const character = await Character.createOne({name, pic})

  t.is(character.name, name)
  t.is(character.pic, pic)
})

test("Should also generate a code for character with Nano ID", async t => {
  t.plan(1)

  const name = faker.name.findName()
  const pic = system.fileName()

  const character = await Character.createOne({name, pic})

  t.true(nanoid.returned(character.code))
})

test.after(closeConnection)
