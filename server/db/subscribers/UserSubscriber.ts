import {EventSubscriber, EventArgs, EntityName} from "@mikro-orm/core"

import {hashPassword} from "../../lib/utils/password.js"
import {User} from "../entities/User.js"

export class UserSubscriber implements EventSubscriber<User> {
  getSubscribedEntities(): Array<EntityName<User>> {
    return [User]
  }

  async beforeCreate(event: EventArgs<User>) {
    const {entity: user} = event

    user.password = await hashPassword(user.password)
  }
}
