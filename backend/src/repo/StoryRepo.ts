import {FindOneOptions} from "@mikro-orm/core"

import {BaseRepo} from "repo/BaseRepo"

import {Story} from "entity/Story"

export class StoryRepo extends BaseRepo<Story> {
  /**
   * Finds the first story that matches given `id` or `slug`
   *
   * @param idOrSlug `id` or `slug` to search a row by
   */
  async findOneByIdOrSlug(
    idOrSlug: string | number,
    options?: FindOneOptions<Story, string>
  ) {
    return this.findOne(
      {
        $or: [
          {
            id: idOrSlug as number,
          },
          {
            slug: idOrSlug as string
          }
        ]
      },

      options
    )
  }
}
