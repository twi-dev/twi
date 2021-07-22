import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {Chapter} from "entity/Chapter"

export class ChapterSubscriber implements EventSubscriber<Chapter> {
  getSubscribedEntities(): Array<EntityName<Chapter>> {
    return [Chapter]
  }

  async beforeUpdate(event: EventArgs<Chapter>) {
    const {entity: chapter} = event

    // Unlisted chapters does not have their number.
    if (chapter.isDraft === true) {
      chapter.number = null
    }
  }
}
