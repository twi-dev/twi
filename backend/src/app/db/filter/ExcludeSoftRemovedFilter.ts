import {Filter} from "@mikro-orm/core"

export const ExcludeSoftRemovedFilter = () => Filter<{deletedAt?: boolean}>({
  default: true,
  name: "softRemoved",
  cond: {deletedAt: null}
})
