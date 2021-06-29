import {EventSubscriber, EntitySubscriberInterface, InsertEvent} from "typeorm"

import create from "helper/util/createSlug"

import {Tag} from "entity/Tag"

@EventSubscriber()
export class TagSubscriber implements EntitySubscriberInterface<Tag> {
  listenTo() {
    return Tag
  }

  beforeInsert(event: InsertEvent<Tag>) {
    const {entity} = event

    entity.slug = create(entity.name)
  }
}
