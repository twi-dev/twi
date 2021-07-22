import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"
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

export class StorySubscriber implements EventSubscriber<Story> {
  getSubscribedEntities(): Array<EntityName<Story>> {
    return [Story]
  }

  async beforeCreate(event: EventArgs<Story>) {
    const {entity: story} = event

    story.slug = createSlug(story.createdAt, story.title)
  }

  async beforeUpdate(event: EventArgs<Story>) {
    const {changeSet, entity: story} = event

    if (!changeSet) {
      return undefined
    }

    const {payload} = changeSet

    // Update the slug property of the story
    if (payload.title) {
      story.title = createSlug(story.createdAt, story.title)
    }

    // Make sure chapters count is never negative
    if (payload.chaptersCount && payload.chaptersCount < 0) {
      story.chaptersCount = 0
    }

    // Make sure the story can't be marked as finished when it has no chapters
    if (payload.isFinished === true && story.chaptersCount < 1) {
      story.isFinished = false
    }
  }
}
