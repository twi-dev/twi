'use strict'

require './nav-menu'

React = require 'react'
{render} = ReactDOM = require 'react-dom'
StoryEditor = require './component/StoryEditor'

# Components containers
storyEditorRoot = document.querySelector '#story-editor'

# Render components
render <StoryEditor/>, storyEditorRoot if storyEditorRoot?
