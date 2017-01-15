{inject, observer} = require "mobx-react"

StoryEditor = require "../Editor/StoryEditor"

class StoryNew extends StoryEditor
  @title: "Add a new story"

module.exports = inject("character")(observer StoryNew)
