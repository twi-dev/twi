import test from "ava"

import mongoose from "mongoose"
import pq from "proxyquire"
import limax from "limax"

import {lorem} from "faker"
import {spy} from "sinon"

import nanoid from "core/helper/util/nanoid"

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

  const characters = (await generateCharacters(10)).map(({id}) => String(id))
  const genres = (await generateGenres(10)).map(({id}) => String(id))

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

  t.is(String(story.publisher), String(t.context.user.id))
  t.is(story.title, title)
  t.is(story.description, description)

  t.deepEqual(story.characters.map(id => String(id)), characters)
  t.deepEqual(story.genres.map(id => String(id)), genres)
  t.deepEqual(
    story.chapters.list.map(id => String(id)),
    expectedChapters.map(({id}) => String(id))
  )

  t.is(story.chapters.count, 1)
})

test("Should create a short slug with Nano ID", async t => {
  t.plan(1)

  const originalStoryModel = mongoose.models.Story.bind(null)
  const originalStorySchema = Object.assign({}, mongoose.modelSchemas.Story)

  delete mongoose.models.Story
  delete mongoose.modelSchemas.Story

  const spyoid = spy(nanoid)
  const spyax = spy(limax)

  const Story = pq("../../../../../database/model/Story", {
    limax: spyax,
    "../../core/helper/util/nanoid": {
      default: spyoid
    }
  }).default

  const characters = (await generateCharacters(10)).map(({id}) => String(id))
  const genres = (await generateGenres(10)).map(({id}) => String(id))

  const title = lorem.word()
  const description = lorem.paragraph()

  const text = lorem.paragraphs()

  const chapter = {
    title, text
  }

  const story = await Story.createOne(t.context.user.id, {
    title, description, characters, genres, chapter
  })

  t.true(spyoid.returned(story.slug.short))

  delete mongoose.models.Story
  delete mongoose.modelSchemas.Story

  mongoose.models.Story = originalStoryModel.bind(null)
  mongoose.modelSchemas.Story = Object.assign({}, originalStorySchema)
})

test(
  "Should create a full slug based on random string and story title",
  async t => {
    t.plan(1)

    const originalStoryModel = mongoose.models.Story.bind(null)
    const originalStorySchema = Object.assign({}, mongoose.modelSchemas.Story)

    delete mongoose.models.Story
    delete mongoose.modelSchemas.Story

    const spyoid = spy(nanoid)
    const spyax = spy(limax)

    const Story = pq("../../../../../database/model/Story", {
      limax: spyax,
      "../../core/helper/util/nanoid": {
        default: spyoid
      }
    }).default

    const characters = (await generateCharacters(10)).map(({id}) => String(id))
    const genres = (await generateGenres(10)).map(({id}) => String(id))

    const title = lorem.word()
    const description = lorem.paragraph()

    const text = lorem.paragraphs()

    const chapter = {
      title, text
    }

    const story = await Story.createOne(t.context.user.id, {
      title, description, characters, genres, chapter
    })

    const short = spyoid.lastCall.returnValue
    const full = `${spyax.lastCall.returnValue}.${short}`

    t.is(story.slug.full, full)

    delete mongoose.models.Story
    delete mongoose.modelSchemas.Story

    mongoose.models.Story = originalStoryModel.bind(null)
    mongoose.modelSchemas.Story = Object.assign({}, originalStorySchema)
  }
)

test("Should throw an error on Story.createMany invocation", async t => {
  t.plan(1)

  await t.throws(
    Story.createMany(),
    "This method is not allowed in this class. Use Story.createOne instead."
  )
})

test("Should throw an error when no publisher's ID given", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne())

  t.true(err instanceof TypeError)
  t.is(err.message, "Can't create a story: No publisher's ID given.")
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
