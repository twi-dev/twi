import {basename} from "path"

import test from "ava"

import Koa from "koa"
import req from "supertest"
import isEmpty from "lodash/isEmpty"

import {readFile} from "promise-fs"

import {multipart} from "core/middleware/008-multipart"

function server(processFile, options = {}) {
  const koa = new Koa()

  koa
    .use(multipart({...options, processFile}))
    .use(ctx => {
      ctx.type = "application/json"
      ctx.body = {
        ...ctx.request.body
      }
    })

  return koa.listen()
}

test("Should ignore non-POST requests", async t => {
  t.plan(1)

  const res = await req(server()).get("/?someKey=some value")

  t.true(isEmpty(res.body))
})

test("Should ignore non-multipart requests", async t => {
  t.plan(3)

  const res = await req(server())
    .post("/")
    .send({someKey: "some value"})
    .set("content-type", "application/json")

  t.is(res.type, "application/json")
  t.notDeepEqual(res.body, {
    someKey: "somve value"
  })
  t.true(isEmpty(res.body))
})

test("Should response a flat object", async t => {
  t.plan(1)

  const {body} = await req(server())
    .post("/")
    .field("earthPony", "Apple Bloom")
    .field("unicorn", "Sweetie Belle")
    .field("pegasus", "Scootaloo")
    .field("alicorn", "Nyx")

  const expected = {
    earthPony: "Apple Bloom",
    unicorn: "Sweetie Belle",
    pegasus: "Scootaloo",
    alicorn: "Nyx"
  }

  t.deepEqual(body, expected)
})

test("Should handle files", async t => {
  t.plan(1)

  const filename = basename(__filename)

  const {body} = await req(server(({filename}) => filename))
    .post("/")
    .attach("file", __filename)

  t.is(body.file, filename)
})

test("Should response files content", async t => {
  t.plan(1)

  const {body} = await req(server(async ({read}) => String(await read())))
    .post("/")
    .attach("file", __filename)

  const expected = String(await readFile(__filename))

  t.is(body.file, expected)
})
