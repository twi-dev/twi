import {Repository, EntityRepository, In} from "typeorm"
import {Service} from "typedi"
import {isEmpty} from "lodash"

import {Tag} from "entity/Tag"

@Service()
@EntityRepository(Tag)
export class TagRepo extends Repository<Tag> {
  async findOrCreateMany(tags: string[]): Promise<Tag[]> {
    const found = await this.find({where: {name: In(tags)}, select: ["name"]})

    const names = found.map(({name}) => name)

    const created = tags
      .filter(name => !names.includes(name))
      .map(name => this.create({name}))

    if (!isEmpty(created)) {
      await this.save(created)
    }

    return this.find({where: {name: In(tags)}})
  }
}
