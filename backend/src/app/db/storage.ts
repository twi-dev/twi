import {EntityManager} from "@mikro-orm/core"
import {AsyncLocalStorage} from "async_hooks"

const storage = new AsyncLocalStorage<EntityManager>()

export default storage
