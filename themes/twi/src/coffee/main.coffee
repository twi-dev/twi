'use strict'

require './nav-menu'

React = require 'react'
{render} = ReactDOM = require 'react-dom'
StoryEditor = require './component/editor/StoryEditor'

# Components containers
storyEditorRoot = document.querySelector '#story-editor'

# Render components
render <StoryEditor
  action="/story/new" method="post"
/>, storyEditorRoot if storyEditorRoot?
