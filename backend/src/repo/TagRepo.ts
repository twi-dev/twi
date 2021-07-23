import {EntityRepository} from "@mikro-orm/mysql"
import {isEmpty} from "lodash"
import {Service} from "typedi"

import {Tag} from "entity/Tag"

@Service()
export class TagRepo extends EntityRepository<Tag> {
  /**
   * Finds or creates tags based on given list of tags names.
   *
   * @param list A list of the tags names.
   */
  async findOrCreate(list: string[]): Promise<Tag[]> {
    const found = await this.find({name: {$in: list}})

    const names = found.map(({name}) => name.toLowerCase())

    const created = list
      .filter(name => !names.includes(name.toLowerCase()))
      .map(name => new Tag(name))

    if (!isEmpty(created)) {
      await this.persistAndFlush(created)
    }

    return this.find({name: {$in: list}})
  }
}
