{Component, PropTypes} = React = require 'react'
InputField = require '../element/InputField'
TextareaField = require '../element/TextareaField'
InputSuggestions = require '../element/InputSuggestions'
ChapterConstructor = require './ChapterConstructor'

{assign, isEmpty} = require 'lodash'
axios = require '../../helpers/axios-instance'

###
# StoryEditor component classs
# Render story editor form into provided document element
#
# Note: This is just a first draft of StoryEditor.
#   I'm not a frontend developer, so, this one may looks ugly :)
###
class StoryEditor extends Component
  @propTypes:
    action: PropTypes.string.isRequired
    method: PropTypes.string.isRequired

  @defaultProps:
    method: 'post'

  constructor: ->
    @state =
      title: ''
      characters: []
      marks: []
      synopsis: ''
      description: ''
      chapters: []
      isItDraft: no

  ###
  # Submit handler
  #
  # @params Event e 
  ###
  submit: (e) =>
    do e.preventDefault
    {dataset: {csrf}} = document.querySelector '#story-editor'
    {
      title, characters
      marks, synopsis
      description, chapters
      isItDraft, chapters
    } = @state

    # unless title
    #   return console.info 'Рассказ должен быть озаглавлен.'

    # if characters.length < 1
    #   return console.info 'В рассказе должен быть хотя бы один персонаж.'

    # if marks.length < 1
    #   return console.info 'Рассказ должен содержать хотя бы одну метку.'

    # if isEmpty chapters
    #   return console.info 'Рассказ должен содержать хотя бы одну главу.'

    axios.post '/story/new', {
      _csrf: csrf
      title
      characters
      chapters
      marks
      synopsis
      description
      isItDraft
    }
    .then (res) -> console.log res.data
    .catch (err) -> console.log err

  updateStatesOfFields: (e) => @setState "#{e.target.name}": e.target.value

  spliceFromState: (stateName, id) ->
    newState = @state[stateName][..]
    for value, index in newState when value is id
      newState.splice index, 1

    @setState "#{stateName}": newState

  ###
  # Push given value to state with given name o_O
  #
  # @param string stateName
  # @param mixed value
  ###
  pushToState: (stateName, value) ->
    return if value in @state[stateName]

    newState = @state[stateName][..] # Copy old state
    newState.push value

    @setState "#{stateName}": newState

  _chaptersRegister: (chapter) ->

  ###
  # Add new character to characters state
  #
  # @param UUID characterId
  ###
  _pushCharacter: (characterId) => @pushToState 'characters', characterId

  _spliceCharacter: (id) => @spliceFromState 'characters', id

  ###
  # Add new mark to marks state
  #
  # @param UUID markId
  ###
  _pushMark: (markId) => @pushToState 'marks', markId

  _spliceMark: (id) => @spliceFromState 'marks', id

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
          onChange={@updateStatesOfFields}
        />
      </div>
      <div className="story-editor-field-container">
        <InputSuggestions
          type="text"
          name="characters"
          label="Персонажи"
          url="/story/characters"
          selected={@state.characters}
          onChange={@_pushCharacter}
          onClick={@_spliceCharacter}
        />
      </div>
      <div className="story-editor-field-container">
        <InputSuggestions
          type="text"
          name="marks"
          label="Метки"
          url="/story/marks"
          selected={@state.marks}
          onChange={@_pushMark}
          onClick={@_spliceMark}
        />
      </div>
      <div className="story-editor-field-container">
        <TextareaField
          name="synopsis"
          label="Синопсис"
          onChange={@updateStatesOfFields}
        />
      </div>
      <div className="story-editor-field-container">
        <TextareaField
          name="description"
          label="Описание"
          onChange={@updateStatesOfFields}
        />
      </div>
      <div className="story-editor-field-container">
        <ChapterConstructor
          chaptersRegister={@_chaptersRegister}
          chapters={@state.chapters}
        />
      </div>
      <div className="story-editor-field-container story-editor-buttons">
        <button
          formNoValidate
          type="button"
          className="button button-flat button-white"
          onClick={@send}
        >
          Сохранить
        </button>
        <button
          formNoValidate
          className="button button-raised button-raised-violet"
          onClick={@send}
        >
          Отправить
        </button>
      </div>
    </form>

module.exports = StoryEditor
