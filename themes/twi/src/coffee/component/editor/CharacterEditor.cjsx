{Component} = React = require 'react'
InputField = require '../element/InputField'

{isEmpty, debounce} = require 'lodash'
axios = require '../../helpers/axios-instance'

class CharacterEditor extends Component
  constructor: ->
    @state =
      current: ''
      characters: []

  pushCharacter: (tag) ->

  popCharacter: -> @setState characters: do @state.characters.pop

  updateState: (e) =>
    @setState current: e.target.value
    # e.target.value = ''

    axios.get '/story/characters/' + e.target.value
      .then (res) -> console.log res.data
      .catch (err) -> console.log err

  render: ->
    <div className="character-editor-container">
      <div className="characher-editor-field">
        <InputField
          name="current"
          label="Персонажи"
          updateState={@updateState}
        />
      </div>
      <div className="character-editor-list"></div>
    </div>

module.exports = CharacterEditor
