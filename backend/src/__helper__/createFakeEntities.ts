import {BaseEntity} from "entity/abstract/BaseEntity"

interface CreateFakeEntitiesFunction<T extends BaseEntity> {
  (entity: T): T | void
}

interface EntityConstructor<T extends BaseEntity> {
  new (): T
}

function createFakeEntities<T extends BaseEntity>(
  Entity: EntityConstructor<T>,
  amount: number,
  cb: CreateFakeEntitiesFunction<T>,
  generateId = false
): T[] {
  return new Array<undefined>(amount).fill(undefined).map<T>((_, id) => {
    const entity = new Entity()

    if (generateId) {
      entity.id = id
    }

    cb(entity)

    return entity
  })
}

export default createFakeEntities
