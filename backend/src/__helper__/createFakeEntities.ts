import AbstractEntity from "entity/abstract/AbstractEntity"

interface CreateFakeEntitiesFunction<T extends AbstractEntity> {
  (entity: T): T | void
}

interface EntityConstructor<T extends AbstractEntity> {
  new (): T
}

function createFakeEntities<T extends AbstractEntity>(
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
