import {describe} from "vitest"

describe("a demo test", async test => {
  test("2 + 2 = 4", async ({expect}) => {
    expect(2 + 2).to.be.equal(4)
  })
})
