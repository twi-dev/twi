{Component} = React = require 'react'

class TextareaField extends Component
  render: ->
    <div className="input-container">
      <textarea
        required
        className="story-editor-info form-input"
        name={@props.name}
        onChange={@props.onChangeHandler}
      />
      <div className="field-underscore"></div>
      <div className="input-label">{@props.label}</div>
    </div>

module.exports = TextareaField
