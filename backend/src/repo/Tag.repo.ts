import {Repository, EntityRepository, In} from "typeorm"
import {Service} from "typedi"
import {isEmpty} from "lodash"

import {Tag} from "entity/Tag"

@Service()
@EntityRepository(Tag)
export class TagRepo extends Repository<Tag> {
  async findOrCreateMany(tags: string[]): Promise<Tag[]> {
    const found = await this.find({where: {name: In(tags)}, select: ["name"]})

    const names = found.map(({name}) => name.toLowerCase())

    const created = tags
      .filter(name => !names.includes(name.toLowerCase()))
      .map(name => this.create({name}))

    if (!isEmpty(created)) {
      await this.save(created)
    }

    return this.find({where: {name: In(tags)}})
  }
}
