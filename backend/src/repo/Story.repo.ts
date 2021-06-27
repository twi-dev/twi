import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {Service} from "typedi"

import {Story} from "entity/Story"

@Service()
@EntityRepository(Story)
export class StoryRepo extends Repository<Story> {
  async createAndSave(
    publisherId: number,
    story: DeepPartial<Story>
  ): Promise<Story> {
    // Set dates for Post manually because we need the creating date in slug
    const now = new Date()

    return this.save(this.create({
      ...story,

      publisherId: publisherId,
      createdAt: now,
      updatedAt: now
    }))
  }

  /**
   * Finds the first row that matches given `id` or `slug`
   *
   * @param idOrSlug `id` or `slug` to search a row by
   */
  findByIdOrSlug(idOrSlug: number | string): Promise<Story | undefined> {
    return this.findOne({
      where: [
        {
          isDraft: false,
          id: Number(idOrSlug)
        },
        {
          isDraft: false,
          slug: String(idOrSlug)
        }
      ]
    })
  }
}
