React = require 'react'
LinkedStateMixin = require 'react-addons-linked-state-mixin'
CharacterEditor = require './CharacterEditor'

co = require 'co'
axios = require '../helpers/axios-instance'

# axios = axios.create
#   headers:
#     'X-Requested-With': 'XmlHttpRequest'

###
# StoryEditor component classs
# Render story editor form into provided document element
#
# Note: This is just a first draft of StoryEditor.
#   I'm not a frontend developer, so, this one may looks ugly :)
###
class StoryEditor extends React.Component
  constructor: ->
    @state =
      title: ''
      characters: ''
      marks: ''
      synopsis: ''
      info: ''

  ###
  # Submit handler
  #
  # @params Event e 
  ###
  submit: (e) =>
    do e.preventDefault
    {csrf} = document.querySelector('#story-editor').dataset
    {title, characters, marks, synopsis, info} = @state

    axios.post '/story/new', {
      _csrf: csrf
      title
      characters
      marks
      synopsis
      info
    }
    .then (res) -> console.log res.data
    .catch (err) -> console.log err

  updateStatesOfFields: (e) => @setState "#{e.target.name}": e.target.value

  render: ->
    <form action="/story/new" method="post" onSubmit={@submit}>
      <div className="story-editor-field-container">
        <input
          type="text"
          name="title"
          placeholder="Название"
          onChange={@updateStatesOfFields}
        />
      </div>
      <div className="story-editor-field-container">
        <CharacterEditor />
      </div>
      <div className="story-editor-field-container">
        <input
          type="text"
          name="characters"
          placeholder="Метки"
        />
      </div>
      <div className="story-editor-field-container">
        <textarea
          className="story-editor-synopsis"
          name="synopsis"
          placeholder="Синопсис"
          onChange={@updateStatesOfFields}
        ></textarea>
      </div>
      <div className="story-editor-field-container">
        <textarea
          name="info"
          placeholder="Описание"
          onChange={@updateStatesOfFields}
        ></textarea>
      </div>
      <div className="story-editor-field-container">
        <button onSubmit={@send}>Отправить</button>
      </div>
    </form>

module.exports = StoryEditor
