{Component, PropTypes} = React = require 'react'

class InputField extends Component
  @propTypes:
    type: PropTypes.string
    value: PropTypes.string
    name: PropTypes.string.isRequired
    label: PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired
    onKeyDown: PropTypes.func

  @defaultProps:
    type: ''

  render: ->
    <div className="input-container">
      <input
        required
        className="form-input"
        type={@props.type or 'text'}
        name={@props.name}
        onChange={@props.onChange}
        onKeyDown={@props.onKeyDown}
        value={@props.value}
      />
      <div className="field-underscore"></div>
      <div className="input-label">{@props.label}</div>
    </div>

module.exports = InputField
