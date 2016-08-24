{Component, PropTypes} = React = require "react"
ArrowDown = require "../../../../../public/img/layout/arrow-down.svg"

class ActionButton extends Component
  @defaultProps:
    actions: ["submit"]

  @propTypes:
    actions: PropTypes.array.isRequired
    onClick: PropTypes.func.isRequired

  constructor: -> @state = action: "submit", showPanel: no

  showActions: => @setState showPanel: yes

  hideActions: => setTimeout (=> @setState showPanel: no), 0 if @state.showPanel

  renderActions: ->

  render: ->
    <div className="button-action button-violet">
      <span
        className="button-action-label"
      >Отправить</span>
      <span
        tabIndex="0"
        className="button-action-icon"
        onFocus={@showActions}
        onBlur={@hideActions}
      ><ArrowDown /></span>
    </div>

module.exports = ActionButton
