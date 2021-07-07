import faker from "faker"

import {Story} from "entity/Story"

function createFakeStories(amount: number, generateId: boolean = true): Story[] {
  return new Array(amount).fill(undefined).map<Story>((_, index) => {
    const story = new Story()

    if (generateId) {
      story.id
    }

    story.title = faker.lorem.words(2)
    story.description = faker.lorem.paragraph()
    story.cover = null

    return story
  })
}

export default createFakeStories
