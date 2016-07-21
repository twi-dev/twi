{Component} = React = require 'react'
InputField = require '../element/InputField'
TextareaField = require '../element/TextareaField'
InputSuggestions = require '../element/InputSuggestions'

{assign} = require 'lodash'
axios = require '../../helpers/axios-instance'

###
# StoryEditor component classs
# Render story editor form into provided document element
#
# Note: This is just a first draft of StoryEditor.
#   I'm not a frontend developer, so, this one may looks ugly :)
###
class StoryEditor extends Component
  constructor: ->
    @state =
      title: ''
      characters: []
      marks: []
      synopsis: ''
      description: ''
      chapters: []

  ###
  # Submit handler
  #
  # @params Event e 
  ###
  submit: (e) =>
    do e.preventDefault
    {dataset: {csrf}} = document.querySelector '#story-editor'
    {title, characters, marks, synopsis, description} = @state

    axios.post '/story/new', {
      _csrf: csrf
      title
      characters
      marks
      synopsis
      description
    }
    .then (res) -> console.log res.data
    .catch (err) -> console.log err

  updateStatesOfFields: (e) => @setState "#{e.target.name}": e.target.value

  render: ->
    <form
      action={@props.action} method={@props.method}
      onSubmit={@submit} autoComplete="off"
    >
      <div className="story-editor-field-container">
        <InputField
          type="text"
          name="title"
          label="Название"
          updateState={@updateStatesOfFields}
        />
      </div>
      <div className="story-editor-field-container">
        <InputSuggestions
          type="text"
          name="characters"
          label="Персонажи"
          url="/story/characters"
          selected={@state.characters}
        />
      </div>
      <div className="story-editor-field-container">
        <InputSuggestions
          type="text"
          name="marks"
          label="Метки"
          url="/story/marks"
          selected={@state.marks}
        />
      </div>
      <div className="story-editor-field-container">
        <TextareaField
          name="synopsis"
          label="Синопсис"
          updateState={@updateStatesOfFields}
        />
      </div>
      <div className="story-editor-field-container">
        <TextareaField
          name="description"
          label="Описание"
          updateState={@updateStatesOfFields}
        />
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
