import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {createSlug} from "../../lib/utils/slug/createSlug.js"

import {Chapter} from "../entities/Chapter.js"

export class ChapterSubscriber implements EventSubscriber<Chapter> {
  getSubscribedEntities(): EntityName<Chapter>[] {
    return [Chapter]
  }

  async beforeCreate(event: EventArgs<Chapter>): Promise<void> {
    const {entity: chapter} = event

    chapter.slug = createSlug(chapter.title)
  }

  async beforeUpdate(event: EventArgs<Chapter>): Promise<void> {
    const {changeSet, entity: chapter} = event

    if (!changeSet) {
      return
    }

    const {payload} = changeSet

    if (payload.title) {
      chapter.slug = createSlug(payload.title)
    }
  }
}
