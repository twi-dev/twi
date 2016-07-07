React = require 'react'
LinkedStateMixin = require 'react-addons-linked-state-mixin'
CharacterEditor = require './CharacterEditor'

co = require 'co'
axios = require '../../helpers/axios-instance'

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
    {dataset: {csrf}} = document.querySelector '#story-editor'
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
    <form action={@props.action} method={@props.method} onSubmit={@submit}>
      <div className="story-editor-field-container input-container">
        <input
          required
          className="form-input"
          type="text"
          name="title"
          onChange={@updateStatesOfFields}
        />
        <div className="field-underscore"></div>
        <div className="input-label">Название</div>
      </div>
      <div className="story-editor-field-container input-container">
        <CharacterEditor
          characters={@state.characters}
        />
      </div>
      <div className="story-editor-field-container input-container">
        <input
          required
          className="form-input"
          type="text"
          name="marks"
          onChange={@updateStatesOfFields}
        />
        <div className="field-underscore"></div>
        <div className="input-label">Метки</div>
      </div>
      <div className="story-editor-field-container input-container">
        <textarea
          required
          className="story-editor-synopsis form-input"
          name="synopsis"
          onChange={@updateStatesOfFields}
        ></textarea>
        <div className="field-underscore"></div>
        <div className="input-label">Синопсис</div>
      </div>
      <div className="story-editor-field-container input-container">
        <textarea
          required
          className="story-editor-info form-input"
          name="info"
          onChange={@updateStatesOfFields}
        ></textarea>
        <div className="field-underscore"></div>
        <div className="input-label">Описание</div>
      </div>
      <div className="story-editor-field-container">
        <button
          formNoValidate
          className="button button-raised button-raised-violet fr"
          onClick={@send}
        >
          Отправить
        </button>
      </div>
    </form>

module.exports = StoryEditor
