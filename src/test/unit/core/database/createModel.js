import {resolve, dirname} from "path"

import test from "ava"

import mongoose from "mongoose"
import pq from "proxyquire"

import {spy} from "sinon"

import createModel from "core/database/createModel"
import Model from "core/database/Model"

test.beforeEach(() => {
  if (!(mongoose.models.SomeNoopModel && mongoose.modelSchemas.SomeNoopModel)) {
    return
  }

  delete mongoose.models.SomeNoopModel
  delete mongoose.modelSchemas.SomeNoopModel
})

test("Should return all static values from a model, including accessros", t => {
  t.plan(1)

  const path = resolve(__dirname, "../../../../database/schema/someNoopModel")

  const fakeSchema = spy(({TString}) => ({
    field: TString
  }))

  const createModel = pq("../../../../core/database/createModel", {
    [path]: {
      default: fakeSchema,
      "@noCallThru": true
    }
  }).default

  createModel(class SomeNoopModel extends Model {
    static get someGetter() {
      return "some value"
    }

    static someField = "some value of a field"
  })

  const expected = {
    someGetter: "some value",
    someField: "some value of a field"
  }

  const actual = fakeSchema.firstCall.args[1]

  t.deepEqual(actual, expected)
})

test(
  "Should throw an error when middleware module returns non-object value",
  t => {
    t.plan(1)

    const path = resolve(
      __dirname, "../../../../database/middleware/someNoopModel"
    )

    const schemaPath = resolve(
      __dirname, "../../../../database/schema/someNoopModel"
    )

    const fakeMiddleware = "A113"

    const fakeSchema = ({TString}) => ({
      field: TString
    })

    const createModel = pq.noCallThru().load(
      "../../../../core/database/createModel", {
        [path]: fakeMiddleware,
        [schemaPath]: {
          default: fakeSchema
        }
      }
    ).default

    const trap = () => createModel(class SomeNoopModel extends Model {})

    t.throws(trap, "Middlewares module should export a plain object.")
  }
)

test("Should throw an error when schema module is not found", t => {
  t.plan(1)

  const path = resolve(__dirname, "../../../../database/schema")

  const trap = () => createModel(class SomeNoopModel extends Model {})

  t.throws(
    trap,
    "Can't find a schema for SomeNoopModel model. " +
    `Expected module someNoopModel.js at path ${path}`
  )
})

test("Should throw whatever error from a schema module", t => {
  t.plan(1)

  const path = resolve(__dirname, "../../../../database/schema/someNoopModel")

  const fakeSchema = () => {
    throw new Error("Whatever error message.")
  }

  const createModel = pq("../../../../core/database/createModel", {
    [path]: {
      default: fakeSchema,
      "@noCallThru": true
    }
  }).default

  const trap = () => createModel(class SomeNoopModel extends Model {})

  t.throws(trap, "Whatever error message.")
})

test(
  "Should throw an error when passed model desen't extend a Model class",
  t => {
    t.plan(3)

    const trap = () => createModel(class SomeNoopModel {})

    const err = t.throws(trap)

    t.true(err instanceof TypeError)
    t.is(err.message, "Target model should extend a class Model.")
  }
)
