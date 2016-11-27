"use strict"

require "./nav-menu"

React = require "react"
{render} = require "react-dom"

StoryEditor = require "component/editor/story/AddStory"
BlogAddPost = require "component/editor/blog/AddPost"

# Components containers
storyEditorRoot = document.querySelector "#story-editor-add"
blogEditorRoot = document.querySelector "#blog-editor"

render <StoryEditor
  action="/story/new" method="post"
/>, storyEditorRoot if storyEditorRoot?

render <BlogAddPost />, blogEditorRoot if blogEditorRoot?
