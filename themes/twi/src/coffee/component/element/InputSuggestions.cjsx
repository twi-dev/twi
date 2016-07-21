{Component} = React = require 'react'
InputField = require './InputField'
axios = require '../../helpers/axios-instance'
keys = require '../../helpers/keyboard'
{isEmpty} = require 'lodash'

class InputSuggestions extends Component
  constructor: ->
    @state =
      showList: no
      current: ''
      suggestions: []

  ###
  # Change selected item in list
  ###
  _changeSelection: ->

  _pushSuggestion: (suggestion) ->
    return unless suggestion

    @props.selected.push suggestion unless suggestion in @props.selected
    @setState showList: no, current: ''

  _renderSuggestionMark: (suggestion) ->
    if suggestion.pic
      <div className="character-editor-list-pic fl">
        <img
          src="/images/characters/#{suggestion.pic or 'no-image.png'}"
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

  chooseByClick: (e) => @_pushSuggestion e.currentTarget.dataset.id

  chooseByKeyDown: (e) =>
    if e.keyCode in [keys.TAB, keys.ENTER, keys.UP, keys.DOWN] and @state.showList
      do e.preventDefault

      if e.keyCode in [keys.TAB, keys.ENTER]
        console.log 'tab on enter'

      if e.keyCode in [keys.UP, keys.DOWN]
        console.log 'up or down'

  render: ->
    <div className="input-suggestions-container">
      <div className="input-suggestions-field">
        <InputField
          name={@props.name}
          label={@props.label}
          value={@state.current}
          onChangeHandler={@getSuggestions}
          onKeyDownHandler={@chooseByKeyDown}
        />
      </div>
      <div className="input-suggestions-list-container#{
          if @state.showList then ' input-suggestions-list-active' else ''
        }"
      >
        <ul className="input-suggestions-list">{do @_renderSuggestionsList}</ul>
      </div>
    </div>

module.exports = InputSuggestions
