"use strict"

require "./nav-menu"

React = require "react"
{render} = ReactDOM = require "react-dom"
StoryEditor = require "./component/editor/StoryEditor"
BlogAddPost = require "component/editor/blog/AddPost"

# Components containers
storyEditorRoot = document.querySelector "#story-editor"
blogEditorRoot = document.querySelector "#blog-editor"

Render components
render <StoryEditor
  action="/story/new" method="post"
/>, storyEditorRoot if storyEditorRoot?

render <BlogAddPost />, blogEditorRoot if blogEditorRoot?
