BlogEditor = require "./BlogEditor"

axios = require "helper/axios"

class BlogAddPost extends BlogEditor
  submit: ->
    {dataset: {csrf}} = document.querySelector "#blog-editor"
    {title, content, tags} = @state
    axios.post "/blog/new", {_csrf: csrf, title, content, tags: []}
      .then ({data}) -> console.log data
      .catch (err) -> console.log err

  save: -> console.log "noop"

module.exports = BlogAddPost
