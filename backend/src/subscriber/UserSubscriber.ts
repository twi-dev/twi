import {EventSubscriber, EntitySubscriberInterface, InsertEvent} from "typeorm"
import {Service} from "typedi"

import {hashPassword} from "repo/UserRepo"
import {User} from "entity/User"

@Service()
@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User
  }

  async beforeInsert(event: InsertEvent<User>) {
    event.entity.password = await hashPassword(event.entity.password)
  }
}
