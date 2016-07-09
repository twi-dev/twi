{Component} = React = require 'react'

class InputField extends Component
  render: ->
    <div className="input-container">
      <input
        required
        className="form-input"
        type={@props.type ? 'text'}
        name={@props.name}
        onChange={@props.updateState}
      />
      <div className="field-underscore"></div>
      <div className="input-label">{@props.label}</div>
    </div>

module.exports = InputField
