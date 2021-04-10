import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {Service} from "typedi"

import {Story} from "entity/Story"

@Service()
@EntityRepository()
export class StoryRepo extends Repository<Story> {
  async createAndSave(
    publisherId: number,
    story: DeepPartial<Story>
  ): Promise<Story> {
    story.publisherId = publisherId
    story.createdAt = new Date()

    return this.save(this.create(story))
  }

  findByIdOrSlug(idOrSlug: number | string): Promise<Story> {
    return this.findOne({
      where: [
        {
          isDraft: false,
          id: idOrSlug
        },
        {
          isDraft: false,
          slug: idOrSlug
        }
      ]
    })
  }
}

export default StoryRepo
