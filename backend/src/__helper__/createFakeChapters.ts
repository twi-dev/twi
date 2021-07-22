import faker from "faker"

import {Chapter} from "entity.old/Chapter"

import createFakeEntities from "./createFakeEntities"

const createFakeChapters = (
  amount: number,
  generateId: boolean = false
): Chapter[] => createFakeEntities(
  Chapter,
  amount,

  chapter => {
    chapter.title = faker.lorem.words(2)
    chapter.description = faker.lorem.paragraph()
    chapter.text = faker.lorem.paragraphs(10)
  },

  generateId
)

export default createFakeChapters
