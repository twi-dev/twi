BlogEditor = require "./BlogEditor"

axios = require "helper/axios"

class BlogAddPost extends BlogEditor
  submit: ->
    {dataset: {csrf}} = document.querySelector "#blog-editor"
    {title, content, tags} = @state
    axios.post "/blog/new", {_csrf: csrf, title, content, tags: @state.tags}
      .then ({data}) -> console.log data
      .catch (err) -> console.error err

  save: -> console.log "noop"

module.exports = BlogAddPost
