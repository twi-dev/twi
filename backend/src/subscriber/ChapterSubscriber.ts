import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {Chapter} from "entity/Chapter"

export class ChapterSubscriber implements EventSubscriber<Chapter> {
  getSubscribedEntities(): Array<EntityName<Chapter>> {
    return [Chapter]
  }

  async beforeUpdate(event: EventArgs<Chapter>) {
    const {entity: chapter, changeSet} = event

    // Reset chapter.number column to null when:
    // 1. The chapter marked as unlisted.
    // 2. The chapter marked to soft removing.
    if (chapter.isDraft === true || changeSet?.payload.deletedAt) {
      chapter.number = null
    }
  }
}
