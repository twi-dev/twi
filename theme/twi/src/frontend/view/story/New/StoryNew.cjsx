React = require "react"
{inject, observer} = require "mobx-react"

StoryEditor = require "component/editor/story/StoryEditor"

StoryNew = ({app}) -> <StoryEditor />

StoryNew.title = "Add a new story"

module.exports = inject("character", "app")(observer StoryNew)
