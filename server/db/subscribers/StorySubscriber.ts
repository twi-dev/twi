import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {Story} from "../entities/Story.js"

import {formatStorySlug} from "../../lib/utils/slug/storySlug.js"

export class StorySubscriber implements EventSubscriber<Story> {
  getSubscribedEntities(): EntityName<Story>[] {
    return [Story]
  }

  async beforeCreate(event: EventArgs<Story>): Promise<void> {
    const {entity: story} = event

    story.slug = formatStorySlug(story.title)
  }

  async beforeUpdate(event: EventArgs<Story>) {
    const {changeSet, entity: story} = event

    if (!changeSet) {
      return undefined
    }

    const {payload} = changeSet

    // Update the slug property of the story
    if (payload.title) {
      story.slug = formatStorySlug(story.title)
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
