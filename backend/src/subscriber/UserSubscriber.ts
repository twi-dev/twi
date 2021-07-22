import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {hashPassword} from "repo/UserRepo"
import {User} from "entity/User"

export class UserSubscriber implements EventSubscriber<User> {
  getSubscribedEntities(): Array<EntityName<User>> {
    return [User]
  }

  async beforeCreate(event: EventArgs<User>) {
    const {entity: user} = event

    const hashed = await hashPassword(user.password)

    user.password = hashed
  }
}
