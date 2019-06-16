import limax from "limax"
import nanoid from "nanoid"

import {createModel, Model} from "core/db"

import schema from "./schema"

const generateSlug = payload => nanoid(8).then(short => ({
  short, full: `${short}/${limax(payload)}`
}))

@createModel(schema)
class Story extends Model {
  static async createOne(story, options = {}) {
    story.slug = await generateSlug(story.title)

    return super.createOne(story, options)
  }
}

export default Story
