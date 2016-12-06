{Component, PropTypes} = React = require 'react'

class TextareaField extends Component
  @propTypes:
    name: PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  render: ->
    <div className="input-container">
      <textarea
        required
        className="story-editor-info form-input"
        name={@props.name}
        onChange={@props.onChange}
      />
      <div className="field-underscore"></div>
      <div className="input-label">{@props.label}</div>
    </div>

module.exports = TextareaField
