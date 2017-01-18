React = require "react"
{inject, observer} = require "mobx-react"

StoryEditor = require "component/editor/story/StoryEditor"

mapStoresToProps = ({app, newStory}) -> {app, newStory}

StoryNew = ({app, newStory}) -> <StoryEditor story={newStory} />

StoryNew.title = "Add a new story"

module.exports = inject(mapStoresToProps)(observer StoryNew)
