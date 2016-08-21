require "codemirror/mode/markdown/markdown"
require "codemirror/keymap/sublime"

{Component, PropTypes} = React = require "react"
Markdown = require "markdown-it"
Codemirror = require "react-codemirror"
hljs = require 'highlight.js'

md = new Markdown
  breaks: on
  highlight: (string, lang) ->
    unless lang and hljs.getLanguage lang
      return "
        <pre class=\"hljs\">
          <code>#{md.utils.escapeHtml string}</code>
        </pre>
      "

    try
      return "
        <pre class=\"hljs\">
          <code>#{hljs.highlight(lang, string, true).value}</code>
        </pre>
      "
    catch e
      console.log e

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
        <div className="blog-editor-field-title">
          <input
            type="text"
            name="title"
            onChange={@updateTitle}
            placeholder="Type note title here..."
          />
        </div>
        <div
          className="blog-editor-field-content"
          style={{height: parseInt(@state.height) - 49}}
        >
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
      </div>
      <div className="blog-editor-preview fl">
        <h4>{@state.title}</h4>
        <div
          className="blog-editor-preview-content"
          style={{height: parseInt(@state.height) - 49}}
          dangerouslySetInnerHTML={do @_renderPreview}
        ></div>
      </div>
    </div>

module.exports = BlogEditor
