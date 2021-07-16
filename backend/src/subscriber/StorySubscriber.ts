import {
  EventSubscriber,
  EntitySubscriberInterface,
  UpdateEvent,
  InsertEvent
} from "typeorm"
import {Service} from "typedi"
import {format} from "date-fns"

import {Story} from "entity/Story"

import create from "helper/util/createSlug"

const SLUG_DATE_MASK = "yyyy/MM/dd"

/**
 * Creates a new slug for the story
 */
const createSlug = (date: number | Date, value: string) => (
  `${format(date, SLUG_DATE_MASK)}/${create(value)}`
)

@Service()
@EventSubscriber()
export class StorySubscriber implements EntitySubscriberInterface {
  listenTo() {
    return Story
  }

  beforeInsert(event: InsertEvent<Story>) {
    const {entity} = event

    // Create a date manually
    const now = new Date()

    entity.createdAt = now
    entity.updatedAt = now
    entity.slug = createSlug(now, entity.title)
  }

  beforeUpdate(event: UpdateEvent<Story>) {
    const updated = event.updatedColumns.map(({propertyName}) => propertyName)

    const {entity} = event

    // Update the slug property of the story
    if (updated.includes("title")) {
      entity.slug = createSlug(entity.createdAt, entity.title)
    }

    // Make sure to keep chapters count positive. Just in case.
    if (updated.includes("chaptersCount") && entity.chaptersCount < 0) {
      entity.chaptersCount = 0
    }

    // Make sure the story can't be marked as finished when it has no chapters
    if (
      updated.includes("isFinished")
        && entity.isFinished === true
        && entity.chaptersCount < 1
    ) {
      entity.isFinished = false
    }
  }
}
