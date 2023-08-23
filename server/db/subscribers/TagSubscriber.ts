import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {Tag} from "../entities/Tag.js"

import {createSlug} from "../../lib/utils/createSlug.js"

export class TagSubscriber implements EventSubscriber<Tag> {
  getSubscribedEntities(): EntityName<Tag>[] {
    return [Tag]
  }

  async beforeCreate(event: EventArgs<Tag>): Promise<void> {
    const {entity: tag} = event

    // @ts-expect-error This field shuoldn't be writable, but we need to create slug
    tag.slug = createSlug(tag.name)
  }
}
