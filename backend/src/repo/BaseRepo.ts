import {EntityRepository, EntityManager} from "@mikro-orm/mysql"
import {AnyEntity} from "@mikro-orm/core"

export abstract class BaseRepo<T> extends EntityRepository<T> {
  /**
   * Marks given entity for soft removing.
   * This method will add current date as the value for deletedAt column.
   */
  softRemove(entity: AnyEntity<T>): EntityManager {
    const storage = this.em.getMetadata()
    const meta = storage.get(String(this.entityName))

    if (!("deletedAt" in meta.properties)) {
      throw Error(
        `Cannot perform softRemove action on ${this.entityName} entity. `
          + "The deletedAt column is missing in its properties list."
      )
    }

    (entity as any).deletedAt = new Date()

    return this.em.persist(entity)
  }

  /**
   * Marks given entity for soft removing and persists it immediately.
   * Equivalent to `em.softRemove(e).flush()`
   */
  softRemoveAndFlush(entity: AnyEntity<T>): Promise<void> {
    return this.softRemove(entity).flush()
  }
}
