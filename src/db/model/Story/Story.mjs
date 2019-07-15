import nanoid from "nanoid/async"
import limax from "limax"

import {createModel, Model} from "core/db"

import schema from "./schema"

const generateSlug = payload => nanoid(8).then(short => ({
  short, full: `${short}.${limax(payload)}`
}))

@createModel(schema)
class Story extends Model {
  static async create(story, options) {
    // TODO: Move these checks to middlewares
    if (!(story.chapters || story.characters || story.genres)) {
      story.isDraft = true
      story.isFinished = false
    }

    story.slug = await generateSlug(story.title)

    return super.create(story, options)
  }

  addChapter(chapter) {
    return this.updateOne({$push: {chapters: chapter}})
  }

  removeChapter(chapter) {
    return this.updateOne({$pull: {chapters: chapter}})
  }
}

export default Story
