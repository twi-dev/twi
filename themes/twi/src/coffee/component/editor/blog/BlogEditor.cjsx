require "codemirror/mode/markdown/markdown"
require "codemirror/keymap/sublime" # Broken

require "codemirror/addon/edit/matchbrackets"
require "codemirror/addon/edit/closebrackets"
require "codemirror/addon/edit/closetag"

{Component, PropTypes} = React = require "react"

Codemirror = require "react-codemirror"
TagSuggestion = require "component/element/suggestion/Tag"
Tabs = require "component/element/common/tab/TabsContainer"
Tab = require "component/element/common/tab/TabContent"
ActionButton = require "component/element/button/ActionButton"
ArrowDown = require "img/layout/arrow-down.svg"

md = require "helper/md"
axios = require "helper/axios"

class BlogEditor extends Component
  constructor: ->
    {documentElement: {offsetWidth, offsetHeight}} = document
    @state =
      width: offsetWidth
      height: offsetHeight - (52 * 2)
      title: ""
      content: ""
      tags: []

  componentWillMount: -> addEventListener "resize", @resizeComponent

  resizeComponent: =>
    {documentElement: {offsetWidth, offsetHeight}} = document
    @setState width: offsetWidth, height: offsetHeight - (52 * 2)

  submit: -> # noop

  save: -> # noop

  remove: -> # noop

  doAction: (act) => do this[act] if act of this

  updateTitle: ({target: {value}}) => @setState title: value

  updateContent: (content) => @setState {content}

  updateTags: (tag) =>
    newState = [@state.tags...]
    newState.push tag
    @setState tags: newState

  removeTag: (tag) => console.log "noop"

  _onSubmitPrevent: (e) -> do e.preventDefault

  _renderPreview: -> __html: md.render @state.content

  render: ->
    <div className="blog-editor-main-container">
      <form onSubmit={@_onSubmitPrevent} autoComplete="off">
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
              doAction={@doAction}
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
          <TagSuggestion
            name="tag"
            label="Tags"
            selected={@state.tags}
            onChange={@updateTags}
            onClick={@removeTag}
            listPosition="top"
            listStyle={{
              left: "16px"
              width: "200px"
            }}
          ></TagSuggestion>
        </div>
      </form>
    </div>

module.exports = BlogEditor

