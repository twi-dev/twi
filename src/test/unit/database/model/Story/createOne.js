import test from "ava"

import {lorem} from "faker"

import {createConnection, closeConnection} from "test/helper/database"


import Story from "database/model/Story"

import createUser from "../__hook__/createUser"

import generateCharacters from "../__helper__/generateCharacters"
import generateGenres from "../__helper__/generateGenres"

test.before(createConnection)

test.beforeEach(createUser)

test.failing("Should just create a story with given data", async t => {
  t.plan(1)

  const characters = await generateCharacters(10)
  const genres = await generateGenres(10)

  const title = lorem.word()
  const desription = lorem.paragraph()

  const chapter = {
    title, text: lorem.paragraphs()
  }

  const story = await Story.createOne(t.context.user.id, {
    title, desription, characters, genres, chapter
  })

  console.log(story)

  t.pass()
})

test("Should throw an error when no author's ID given", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne())

  t.true(err instanceof TypeError)
  t.is(err.message, "Can't create a story: No author's ID given.")
})

test("Should throw a TypeError when no story information given", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne(t.context.user.id))

  t.true(err instanceof TypeError)
  t.is(err.message, "Story data should be passed as plain JavaScript object.")
})

test("Should throw a TypeError when no story information is empty", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne(t.context.user.id, {}))

  t.true(err instanceof TypeError)
  t.is(err.message, "Story information is required.")
})

test.after(closeConnection)
