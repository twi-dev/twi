{Component} = React = require 'react'
InputField = require '../element/InputField'

{isEmpty} = require 'lodash'
axios = require '../../helpers/axios-instance'

class CharacterEditor extends Component
  constructor: ->
    @state =
      current: ''
      characters: []

  updateState: (e) =>
    console.log e.target.value.split ','
    console.log isEmpty @characters

  render: ->
    <div className="character-editor-container">
      <div className="characher-editor-field">
        <InputField label="Персонажи" updateState={@updateState} />
      </div>
      <div className="character-editor-list"></div>
    </div>

module.exports = CharacterEditor
