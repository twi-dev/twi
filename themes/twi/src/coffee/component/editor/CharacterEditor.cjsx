React = require 'react'

class CharacterEditor extends React.Component
  constructor: ->
    @state =
      characters: []
      list: {}

  render: ->
    <div className="character-editor-container">
      <div className="characher-editor-field input-container">
        <input
          required
          className="form-input"
          type="text"
          name="character"
        />
        <div className="field-underscore"></div>
        <div className="input-label">Персонажи</div>
      </div>
      <div className="character-editor-list"></div>
    </div>

module.exports = CharacterEditor
