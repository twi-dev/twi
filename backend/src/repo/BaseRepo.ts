import {EntityRepository, EntityManager} from "@mikro-orm/mysql"
import {EntityMetadata} from "@mikro-orm/core"

import {BaseEntitySoftRemovable} from "entity/BaseEntitySoftRemovable"

function assertColumn(
  meta: EntityMetadata,
  name: string,
  action: string
): void {
  if (!("deletedAt" in meta.properties)) {
    throw Error(
      `Cannot perform ${action} action on ${name} entity. `
        + "The deletedAt column is missing in its properties list."
    )
  }
}

export abstract class BaseRepo<
  T extends BaseEntitySoftRemovable
> extends EntityRepository<T> {
  /**
   * Marks given entity for soft removing.
   * This method will add current date as the value for deletedAt column.
   */
  softRemove(entity: T): EntityManager {
    const storage = this.em.getMetadata()
    const meta = storage.get(String(this.entityName))

    assertColumn(meta, String(this.entityName), "softRemove")

    // Do nothing and return EntityManager if entity deletedAt column has a date.
    if (entity.deletedAt !== null) {
      return this.em
    }

    entity.deletedAt = new Date()

    return this.em.persist(entity)
  }

  /**
   * Marks given entity for soft removing and persists it immediately.
   * Equivalent to `em.softRemove(e).flush()`
   */
  softRemoveAndFlush(entity: T): Promise<void> {
    return this.softRemove(entity).flush()
  }

  /**
   * Marks soft removed entity for restoring.
   * This method will remove a value from deletedAt column.
   */
  restore(entity: T): EntityManager {
    const storage = this.em.getMetadata()
    const meta = storage.get(String(this.entityName))

    assertColumn(meta, String(this.entityName), "restore")

    return this.em.persist(entity)
  }

  /**
   * Marks soft removed entity for restoring and persists it immediately.
   * Equivalent to `em.restore(e).flush()`
   */
  restoreAndFlush(entity: T): Promise<void> {
    return this.restore(entity).flush()
  }
}
