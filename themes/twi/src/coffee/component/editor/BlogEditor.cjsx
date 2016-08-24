require "codemirror/mode/markdown/markdown"
require "codemirror/keymap/sublime"

require "codemirror/addon/edit/matchbrackets"
require "codemirror/addon/edit/closebrackets"
require "codemirror/addon/edit/closetag"

{Component, PropTypes} = React = require "react"
ActionButton = require "../element/button/ActionButton"
ArrowDown = require "../../../../public/img/layout/arrow-down.svg"

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
      console.error e

class BlogEditor extends Component
  constructor: ->
    {documentElement: {offsetWidth, offsetHeight}} = document
    @state =
      width: offsetWidth
      height: offsetHeight - (52 * 2)
      title: ""
      content: ""
      buttonAction: "submit"

  componentWillMount: -> addEventListener "resize", @resizeComponent

  resizeComponent: =>
    {documentElement: {offsetWidth, offsetHeight}} = document
    @setState width: offsetWidth, height: offsetHeight - (52 * 2)

  submit: (e) =>
    do e.preventDefault
    {title, content, tags} = @state
    console.log title, content

  handleAction: ({currentTarget}) => console.log currentTarget.dataset.action

  updateTitle: ({target: {value}}) => @setState title: value

  updateContent: (content) => @setState {content}

  _renderPreview: ->
    __html: md.render @state.content

  render: ->
    <div>
      <form onSubmit={(e) -> do e.preventDefault} autoComplete="off">
        <div className="blog-editor" style={{height: parseInt(@state.height)}}>
          <div className="blog-editor-field-title">
            <input
              type="text"
              name="title"
              onChange={@updateTitle}
              placeholder="Type note title here..."
              style={{width: @state.width - 170}}
            />
            <ActionButton
              actions={["submit", "save"]}
              onClick={@handleAction}
            />
          </div>
          <div
            className="blog-editor-field blog-editor-field-content fl"
            style={{height: parseInt(@state.height) - 50}}
          >
            <Codemirror
              name="content"
              value={@state.content}
              onChange={@updateContent}
              options={
                mode: "markdown"
                tabSize: 2
                keyMap: "sublime"
                lineWrapping: on
                autoCloseTags: on
                matchBrackets: on
                cursorBlinkRate: 0
                autoCloseBrackets: on
              }
            />
          </div>
          <div
            className="blog-editor-preview fl"
            dangerouslySetInnerHTML={do @_renderPreview}
            style={{height: parseInt(@state.height) - 50}}></div>
        </div>
        <div className="blog-editor-controls">
        </div>
      </form>
    </div>

module.exports = BlogEditor
