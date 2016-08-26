{Component, PropTypes} = React = require "react"
ArrowDown = require "../../../../../public/img/layout/arrow-down.svg"

class ActionButton extends Component
  @defaultProps:
    actions: ["submit"]

  @propTypes:
    actions: PropTypes.array.isRequired
    doAction: PropTypes.func.isRequired

  constructor: -> @state = action: "submit", showPanel: no

  showActions: => @setState showPanel: yes

  hideActions: => setTimeout (=> @setState showPanel: no), 0 if @state.showPanel

  submitAction: ({currentTarget}) =>
    @props.doAction currentTarget?.dataset?.action

  renderActions: ->

  render: ->
    <div className="button-action button-violet">
      <span
        data-action="submit"
        onClick={@submitAction}
        className="button-action-label"
      >Отправить</span>
      <span
        tabIndex="0"
        className="button-action-icon"
        onFocus={@showActions}
        onBlur={@hideActions}
      ><ArrowDown /></span>
      <div className="button-action-list">
        <ul>
          <li>Foo</li>
          <li>Bar</li>
        </ul>
      </div>
    </div>

module.exports = ActionButton
