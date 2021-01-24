import Chapter from "server/model/Chapter/Chapter"

const hooks = {
  /**
   * Remove associated chapters in paranoid mode.
   */
  async beforeDestroy(story, options) {
    const {_modelOptions: modelOptions} = story

    if (!modelOptions.paranoid || options.force) {
      return undefined
    }

    return Chapter.destroy({where: {storyId: story.id}}, options)
  }
}

export default hooks
