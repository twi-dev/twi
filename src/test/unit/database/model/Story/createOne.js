import test from "ava"

import {lorem} from "faker"

import {createConnection, closeConnection} from "test/helper/database"


import Story from "database/model/Story"
import Chapter from "database/model/Chapter"

import createUser from "../__hook__/createUser"

import generateCharacters from "../__helper__/generateCharacters"
import generateGenres from "../__helper__/generateGenres"

test.before(createConnection)

test.beforeEach(createUser)

test("Should just create a story with given data", async t => {
  t.plan(7)

  const characters = (await generateCharacters(10)).map(({id}) => id)
  const genres = (await generateGenres(10)).map(({id}) => id)

  const title = lorem.word()
  const description = lorem.paragraph()

  const text = lorem.paragraphs()

  const chapter = {
    title, text
  }

  const story = await Story.createOne(t.context.user.id, {
    title, description, characters, genres, chapter
  })

  const expectedChapters = await Chapter.find({_id: {$in: story.chapters.list}})

  t.is(String(story.author), t.context.user.id)
  t.is(story.title, title)
  t.is(story.description, description)

  t.deepEqual(story.characters.map(id => String(id)), characters)
  t.deepEqual(story.genres.map(id => String(id)), genres)
  t.deepEqual(
    story.chapters.list.map(id => String(id)),
    expectedChapters.map(({id}) => id)
  )

  t.is(story.chapters.count, 1)
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
