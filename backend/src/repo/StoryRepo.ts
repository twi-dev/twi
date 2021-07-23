import {FindOneOptions, Populate} from "@mikro-orm/core"
import {EntityRepository} from "@mikro-orm/mysql"

import {Story} from "entity/Story"

export class StoryRepo extends EntityRepository<Story> {
  /**
   * Finds the first story that matches given `id` or `slug`
   *
   * @param idOrSlug `id` or `slug` to search a row by
   */
  async findOneByIdOrSlug<P extends Populate<Story> = Populate<Story>>(
    idOrSlug: string | number,
    populate?: FindOneOptions<Story, P>
  ) {
    return this.findOne(
      {
        $or: [
          {
            id: idOrSlug,
          },
          {
            slug: idOrSlug
          }
        ]
      },

      populate
    )
  }
}
