import faker from "faker"

import {Story} from "entity/Story"

import createFakeEntities from "./createFakeEntities"

const createFakeStories = (
  amount: number,
  generateId: boolean = false
): Story[] => createFakeEntities(
  Story,
  amount,

  story => {
    story.title = faker.lorem.words(2)
    story.description = faker.lorem.paragraph()
  },

  generateId
)

export default createFakeStories
