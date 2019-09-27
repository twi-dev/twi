import Chapter from "model/Chapter/Chapter"

const hooks = {
  async beforeDestroy(story, options) {
    const {_modelOptions: modelOptions} = story

    if (!modelOptions.paranoid || options.force) {
      return undefined
    }

    return Chapter.destroy({where: {storyId: story.id}}, options)
  }
}

export default hooks
