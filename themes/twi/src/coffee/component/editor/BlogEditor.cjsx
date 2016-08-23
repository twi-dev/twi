require "codemirror/mode/markdown/markdown"
require "codemirror/keymap/sublime"

require "codemirror/addon/edit/matchbrackets"
require "codemirror/addon/edit/closebrackets"
require "codemirror/addon/edit/closetag"

{Component, PropTypes} = React = require "react"
Markdown = require "markdown-it"
Codemirror = require "react-codemirror"
hljs = require 'highlight.js'

md = new Markdown
  breaks: on
  linkify: on
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
      width: "#{outerWidth}px"
      height: "#{outerHeight - (56 + 124)}px"

  componentWillMount: -> addEventListener "resize", @resizeComponent

  resizeComponent: =>
    @setState width: "#{outerWidth}px", height: "#{outerHeight - (56 + 124)}px"

  submit: (e) =>
    do e.preventDefault
    console.log @state

  updateTitle: ({target: {value}}) => @setState title: value

  updateContent: (content) => @setState {content}

  _renderPreview: ->
    __html: md.render @state.content

  render: ->
    <div>
      <form onSubmit={@submit}>
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
                  autoCloseTags: on
                  matchBrackets: on
                  cursorBlinkRate: 0
                  autoCloseBrackets: on
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
        <div className="blog-editor-controls">
          Editor controls and tags input will be right there...
        </div>
      </form>
    </div>

module.exports = BlogEditor
