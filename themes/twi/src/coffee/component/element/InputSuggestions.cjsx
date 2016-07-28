{Component} = React = require 'react'
InputField = require './InputField'
axios = require '../../helpers/axios-instance'
keys = require '../../helpers/keyboard'
{isEmpty} = require 'lodash'

###
# ImputSuggestions component
#
# @var object state
#   - boolean showList
#   - string current
#   - array selectedSuggestions
#   - array suggestions
###
class InputSuggestions extends Component
  constructor: ->
    @state =
      showList: no
      current: ''
      selectedSuggestions: []
      suggestions: []

  ###
  # Change selected item in list
  ###
  _changeSelection: ->

  ###
  # Remove suggestion with given id
  #
  # @param UUID id
  ###
  _spliceSuggestion: (id) ->
    return unless id

    @props.onClick id

    newState = @state.selectedSuggestions[..]
    for suggestion, index in newState when suggestion.id is id
      newState.splice index, 1
      break

    @setState selectedSuggestions: newState

  ###
  # Add selected suggestion to state
  #
  # @param UUID id
  # @param string name
  ###
  _pushSuggestion: (id, name) ->
    return unless id
    return if id in @props.selected

    @props.onChange id

    newState = @state.selectedSuggestions[..]
    newState.push {id, name}

    @setState showList: no, current: '', selectedSuggestions: newState

  _renderSuggestionMark: (suggestion) ->
    if suggestion.pic
      <div className="character-editor-list-pic fl">
        <img
          src={
            if suggestion.pic
              "/images/characters/#{suggestion.pic}"
            else
              "/img/user/no-image.png"
          }
          alt={suggestion['locale.name']}
        />
      </div>

  _renderSuggestionsList: ->
    return if isEmpty @state.suggestions

    for suggestion in @state.suggestions when not (suggestion.id in @props.selected)
      <li
        key={suggestion.id}
        data-id={suggestion.id}
        onClick={@chooseByClick}
      >
        {@_renderSuggestionMark suggestion}
        <div className="input-suggestions-list-label fl">
          {suggestion['locale.name']}
        </div>
      </li>

  _renderTagList: (tags) ->
    for suggestion in @state.selectedSuggestions
      <div
        key={suggestion.id}
        data-id={suggestion.id}
        className="suggestion-input-tag fl"
        onClick={@removeByClick}
      >
        {suggestion.name}
      </div>

  _renderTags: ->
    return if isEmpty @state.selectedSuggestions

    <div className="suggestion-input-tags">
      {@_renderTagList @state.selectedSuggestions}
    </div>

  ###
  # Get suggestions from server
  #
  # @params Event e
  ###
  getSuggestions: (e) =>
    return unless @props.url

    unless e.target.value
      @setState suggestions: [], showList: no, current: ''
      return

    @setState current: e.target.value

    axios.get "#{@props.url}/#{e.target.value}"
      .then (res) =>
        @setState
          showList: if isEmpty res.data then no else yes
          suggestions: res.data
      .catch (err) -> console.error err

  removeByClick: (e) => @_spliceSuggestion e.currentTarget.dataset.id

  chooseByClick: (e) =>
    @_pushSuggestion e.currentTarget.dataset.id, do e.currentTarget.innerText.trim

  chooseByKeyDown: (e) =>
    if e.keyCode in [keys.TAB, keys.ENTER, keys.UP, keys.DOWN] and @state.showList
      do e.preventDefault

      if e.keyCode in [keys.TAB, keys.ENTER]
        console.log 'tab or enter pressed'

      if e.keyCode in [keys.UP, keys.DOWN]
        console.log 'up or down pressed'

    if e.keyCode is keys.BACKSPACE and @state.current is ''
      do e.preventDefault
      __ref = @state.selectedSuggestions[@state.selectedSuggestions.length - 1]?.id
      @_spliceSuggestion __ref

  render: ->
    <div className="input-suggestions-container">
      <div className="input-suggestions-field">
        <div className="input-container">
          {do @_renderTags}
          <input
            required
            className="form-input"
            type={@props.type or 'text'}
            name={@props.name}
            onChange={@getSuggestions}
            onKeyDown={@chooseByKeyDown}
            value={@state.current}
          />
          <div className="field-underscore"></div>
          <div className="input-label#{
            unless isEmpty @state.selectedSuggestions
               ' input-label-float'
            else ''
          }">
              {@props.label}
            </div>
        </div>
      </div>
      <div className="input-suggestions-list-container#{
          if @state.showList then ' input-suggestions-list-active' else ''
        }"
      >
        <ul className="input-suggestions-list">
          {do @_renderSuggestionsList}
        </ul>
      </div>
    </div>

module.exports = InputSuggestions
