{Component} = React =   require 'react'
InputField = require '../element/InputField'

{isEmpty, debounce} = require 'lodash'
axios = require '../../helpers/axios-instance'

class CharacterEditor extends Component
  constructor: ->
    @state =
      showList: no # Show list container?
      current: '' # Current character name
      suggestions: [] # List of suggesten characters

  ###
  # Push new element to list
  #
  # @param UUID character id
  ###
  pushCharacter: (id) ->
    return unless id
    @props.list.push id unless id in @props.list


  popCharacter: -> @setState characters: do @state.characters.pop

  updateState: (e) =>
    @setState current: e.target.value

    unless e.target.value
      @setState suggestions: [], showList: no
      return

    axios.get '/story/characters/' + e.target.value
      .then (res) =>
        @setState
          showList: if isEmpty res.data then no else yes
          suggestions: res.data
      .catch (err) -> console.error err

  ###
  # Choose character by click
  ###
  chooseByClick: (e) =>
    @pushCharacter e.currentTarget.dataset.id
    @setState showList: no

  ###
  # Re-render suggestions list on state change
  #
  # @param array characters Collection of founded characters
  ###
  _renderListElements: (characters) ->
    return if isEmpty characters

    for character in characters
      <li data-id={character.characterId} onClick={@chooseByClick}>
        <div className="character-editor-list-pic fl">
          <img
            src="/images/characters/#{character.pic or 'no-image.png'}"
            alt={character['locale.name']}
          />
        </div>
        <div className="character-editor-list-label fl">
          {character['locale.name']}
        </div>
      </li>

  render: ->
    <div className="character-editor-container">
      <div className="characher-editor-field">
        <InputField
          name="current"
          label="Персонажи"
          updateState={@updateState}
        />
      </div>
      <div
        className="character-editor-list-container#{
            if @state.showList then ' character-editor-list-active' else ''
          }
        ">
        <ul className="character-editor-list">
          {@_renderListElements @state.suggestions}
        </ul>
      </div>
    </div>

module.exports = CharacterEditor
