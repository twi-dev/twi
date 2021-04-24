import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {Service} from "typedi"

import {Chapter} from "entity/Chapter"

@Service()
@EntityRepository(Chapter)
export class ChapterRepo extends Repository<Chapter> {
  async createAndSave(
    storyId: number,
    chapter: DeepPartial<Chapter>
  ): Promise<Chapter> {
    return this.save(this.create({...chapter, storyId}))
  }
}

export default ChapterRepo
