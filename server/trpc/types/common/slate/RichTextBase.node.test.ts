import {describe, test} from "vitest"

import {RichTextBase, type IRichTextBase} from "./RichTextBase.js"

describe("RichText type", async () => {
  test("parses bold text", async ({expect}) => {
    const expected: IRichTextBase = {
      text: "Bold text",
      bold: true
    }

    const actual = await RichTextBase.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("parses italic text", async ({expect}) => {
    const expected: IRichTextBase = {
      text: "Italic text",
      italic: true
    }

    const actual = await RichTextBase.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("parses underline text", async ({expect}) => {
    const expected: IRichTextBase = {
      text: "Underline text",
      underline: true
    }

    const actual = await RichTextBase.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("parses strikethrough text", async ({expect}) => {
    const expected: IRichTextBase = {
      text: "Strikethrough text",
      strikethrough: true
    }

    const actual = await RichTextBase.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })

  test("parses rich text with evert formatting field", async ({expect}) => {
    const expected: IRichTextBase = {
      text: "This text has all the formatting because why not",
      bold: true,
      italic: true,
      underline: true,
      strikethrough: true
    }

    const actual = await RichTextBase.parseAsync(expected)

    expect(actual).toMatchObject(expected)
  })
})
