React = require 'react'

axios = require '../../helpers/axios-instance'

class CharacterEditor extends React.Component
  constructor: ->
    @state =
      currentCharacter: ''
      characters: []

  updateState: (e) =>
    console.log e.target.value.split ','

  render: ->
    <div className="character-editor-container">
      <div className="characher-editor-field input-container">
        <input
          required
          className="form-input"
          type="text"
          name="characters"
          onChange={@updateState}
        />
        <div className="field-underscore"></div>
        <div className="input-label">Персонажи</div>
      </div>
      <div className="character-editor-list"></div>
    </div>

module.exports = CharacterEditor
