import {string, regex} from "valibot"

const DATABASE_NAME_PATTERN = /^[a-z0-9-_]+$/i

const message = "Invalid database name."
  + `The value must correspond following pattern ${DATABASE_NAME_PATTERN}`

export const DatabaseName = string([regex(DATABASE_NAME_PATTERN, message)])
