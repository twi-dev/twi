import {describe, test, expect} from "vitest"

describe("a demo test", async () => {
  test("2 + 2 = 4", async () => {
    expect(2 + 2).to.be.equal(4)
  })
})
