{Component, PropTypes} = React = require 'react'
Markdown = require 'markdown-it'
Codemirror = require 'codemirror'

md = new Markdown breaks: on

class BlogEditor extends Component
  constructor: ->
    @state =
      title: ''
      content: ''

  componentWillMount: -> console.log outerHeight

  updateState: (e) => @setState "#{e.target.name}": e.target.value

  _renderPreview: ->
    __html: md.render @state.content

  render: ->
    <div className="blog-editor">
      <div className="blog-editor-container fl">
        <input type="text" name="title" onChange={@updateState} />
        <textarea name="content" onChange={@updateState}></textarea>
      </div>
      <div className="blog-editor-preview fl">
        <h4>{@state.title}</h4>
        <div dangerouslySetInnerHTML={do @_renderPreview}></div>
      </div>
    </div>

module.exports = BlogEditor
