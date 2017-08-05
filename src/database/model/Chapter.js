import Markdown from "markdown-it"

import {createModel, Model} from "core/database"

// TODO: Setting up this one
const md = new Markdown({
  breaks: true
})

@createModel
class Chapter extends Model {
  static async createOne(chapter, number = 1) {
    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    }

    return await super.createOne({...chapter, content, number})
  }
}

export default Chapter
