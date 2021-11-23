import {User} from "entity/User"

export interface StateWithViewer {
  /**
   * Contains current viewer, queried from the database.
   */
  viewer: User
}
