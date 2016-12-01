{Component, PropTypes} = React = require "react"

assign = Object.assign ? require "lodash/assign"
isEmpty = require "lodash/isEmpty"
fetch = require "helper/wrapper/fetch"

CharacterField = require "component/element/field/CharacterField"
MarkField = require "component/element/field/MarkField"

###
# StoryEditor component class
# Render story editor form into provided document element
#
# Note: This is just a first draft of StoryEditor.
#   I'm not a actually a frontend developer, so, this one may looks ugly :)
###
class StoryEditor extends Component
  constructor: ->
    @state =
      title: ""
      synopsis: ""
      description: ""
      characters: []
      chapters: []
      marks: []
      draft: no

  componentWillMount: -> # noop

  componentWillReceiveProps: -> # noop

  submit: => # noop

  ###
  # Just prevent default onSubmit behaviour before running "submit" method
  #
  # @param Event event
  ###
  _preventDefaultOnSubmit: (event) => do event.preventDefault; @submit event

  _updateTextFields: ({target: {name, value}}) => @setState "#{name}": value

  _updateCharacters: (characters) => @setState {characters}

  _addCharacter: (id) =>
    @_updateCharacters [@state.characters..., id] unless id in @state.characters

  _updateMarks: (marks) => @setState {marks}

  _addMark: (id) => @_updateMarks [@state.marks..., id] unless id in @state.marks

  render: ->
    <div className="story-editor">
      <form onSubmit={@_preventDefaultOnSubmit} autoComplete="off">
        <div className="story-editor-field">
          <input
            type="text" name="title"
            placeholder='Story title, like "Past Sins"'
            value={@state.title} onChange={@_updateTextFields}
          />
        </div>
        <div className="story-editor-field">
          <textarea
            name="description"
            placeholder="Tell us about your story"
          ></textarea>
        </div>
        <div className="story-editor-field">
          <CharacterField
            choosen={@state.characters} onChange={@_addCharacter}
          />
        </div>
        <div className="story-editor-field">
          <MarkField
            choosen={@state.marks} onChange={@_updateMarks}
          />
        </div>

        <button>Submit</button>
      </form>
    </div>

module.exports = StoryEditor
