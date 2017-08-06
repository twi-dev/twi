import Markdown from "markdown-it"

import {createModel, Model} from "core/database"

import Story from "database/model/Story"

// TODO: Setting up this one
const md = new Markdown({
  breaks: true
})

@createModel
class Chapter extends Model {
  /**
   * Create a new chapter at exiting story
   *
   * @param {string} story – an ID of exiting story
   * @param {object} chapter
   *
   * @return {object}
   */
  static async createOne(story, chapter) {
    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    }

    story = await Story.findById(story).select("chapters").exec()

    const [max] = await this
      .find()
      .where({_id: {$in: story.chapters}})
      .sort({number: -1})
      .limit(1)
      .exec()

    const number = max ? max.number + 1 : 1

    return await super.createOne({...chapter, content, number})
  }
}

export default Chapter
