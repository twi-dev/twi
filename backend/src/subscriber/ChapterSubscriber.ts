import {
  EntitySubscriberInterface,
  EventSubscriber,
  UpdateEvent,
  RemoveEvent
} from "typeorm"
import {Service} from "typedi"

import {Chapter} from "entity/Chapter"

@Service()
@EventSubscriber()
class ChapterSubscriber implements EntitySubscriberInterface<Chapter> {
  listenTo() {
    return Chapter
  }

  beforeUpdate(event: UpdateEvent<Chapter>) {
    const {entity: chapter} = event

    // Unlisted chapters doesn't have their number
    if (chapter.isDraft) {
      chapter.number = null
    }
  }

  beforeRemove(event: RemoveEvent<Chapter>) {
    const {entity: chapter} = event

    if (chapter) {
      chapter.number = null
    }
  }
}

export default ChapterSubscriber
