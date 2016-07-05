React = require 'react'

class CharacterEditor extends React.Component
  render: ->
    <div className="character-editor-container">
      <div className="characher-editor-field">
        <input type="text" name="character" placeholder="Персонажи" />
      </div>
      <div className="character-editor-list"></div>
    </div>

module.exports = CharacterEditor
