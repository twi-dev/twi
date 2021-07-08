import faker from "faker"

import {Chapter} from "entity/Chapter"

function createFakeChapters(
  amount: number,
  generateId: boolean = false
): Chapter[] {
  return new Array(amount).fill(undefined).map<Chapter>((_, index) => {
    const story = new Chapter()

    if (generateId) {
      story.id
    }

    story.title = faker.lorem.words(2)
    story.description = faker.lorem.paragraph()
    story.text = faker.lorem.paragraphs(10)

    return story
  })
}

export default createFakeChapters
