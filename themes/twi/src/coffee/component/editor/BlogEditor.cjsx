require "codemirror/mode/markdown/markdown"
require "codemirror/keymap/sublime"

{Component, PropTypes} = React = require "react"
Markdown = require "markdown-it"
Codemirror = require "react-codemirror"
hljs = require 'highlight.js'

md = new Markdown breaks: on, highlight: hljs

class BlogEditor extends Component
  constructor: ->
    @state =
      title: ""
      content: ""
      height: "#{outerHeight - (56 + 124)}px"

  componentWillMount: -> addEventListener "resize", @resizeComponent

  resizeComponent: => @setState height: "#{outerHeight - (56 + 124)}px"

  updateTitle: ({target: {value}}) => @setState title: value

  updateContent: (content) => @setState {content}

  _renderPreview: ->
    __html: md.render @state.content

  render: ->
    <div className="blog-editor" style={{height: @state.height}}>
      <div className="blog-editor-container fl">
        <input
          type="text"
          name="title"
          placeholder="Type note title here..."
          onChange={@updateTitle}
        />
        <Codemirror
          name="content"
          value={@state.content}
          onChange={@updateContent}
          options={
            mode: "markdown"
            tabSize: 2
            keyMap: "sublime"
            matchBrackets: on
            autoCloseBrackets: on
            cursorBlinkRate: 0
          }
        />
      </div>
      <div className="blog-editor-preview fl">
        <h4>{@state.title}</h4>
        <div dangerouslySetInnerHTML={do @_renderPreview}></div>
      </div>
    </div>

module.exports = BlogEditor
