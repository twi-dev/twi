import test from "ava"

import Koa from "koa"
import req from "supertest"
import isEmpty from "lodash/isEmpty"

import multipart from "core/middleware/008-multipart"

const koa = new Koa()

koa
  .use(multipart())
  .use(ctx => {
    ctx.type = "application/json"
    ctx.body = {
      ...ctx.request.body
    }
  })

test("Should ignore non-POST requests", async t => {
  t.plan(1)

  const res = await req(koa.listen()).get("/?someKey=some value")

  t.true(isEmpty(res.body))
})

test("Should ignore non-multipart requests", async t => {
  t.plan(3)

  const res = await req(koa.listen())
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

  const {body} = await req(koa.listen())
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
