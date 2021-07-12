import {Repository, EntityRepository, DeepPartial} from "typeorm"
import {Service} from "typedi"

import {Chapter} from "entity/Chapter"

@Service()
@EntityRepository(Chapter)
export class ChapterRepo extends Repository<Chapter> {
  async createAndSave(
    chapter: DeepPartial<Chapter>
  ): Promise<Chapter> {
    const created = this.create(chapter)

    // Don't forget to increment chaptersCount first
    created.number = created.story.chaptersCount

    return this.save(created)
  }
}
