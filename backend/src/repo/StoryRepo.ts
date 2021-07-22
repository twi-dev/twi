import {EntityRepository} from "@mikro-orm/mysql"
import {Service} from "typedi"

import {Story} from "entity/Story"

@Service()
export class StoryRepo extends EntityRepository<Story> {
  /**
   * Finds the first story that matches given `id` or `slug`
   *
   * @param idOrSlug `id` or `slug` to search a row by
   */
  async findOneByIdOrSlug(idOrSlug: string | number) {
    return this.findOne({
      $or: [
        {
          id: idOrSlug,
          isDraft: false // TODO: Add filter to get only listed stories
        },
        {
          slug: idOrSlug
        }
      ]
    })
  }
}
