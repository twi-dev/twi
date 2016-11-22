{Component, PropTypes} = React = require "react"
ArrowDown = require("img/layout/arrow-down.svg").default

# t = require "i18n"
t = -> ""

class ActionButton extends Component
  @defaultProps:
    actions: ["submit"]

  @propTypes:
    actions: PropTypes.array.isRequired
    doAction: PropTypes.func.isRequired

  constructor: -> @state = action: "submit", showPanel: no

  showActions: => @setState showPanel: yes

  hideActions: => @setState showPanel: no

  ###
  # Update "action" state
  #
  # @param Event
  ###
  chooseAction: ({currentTarget: {dataset: {action}}}) =>
    do document.activeElement.blur
    @setState {action} if action

  ###
  # Execute action handler by his name
  #
  # @param Event
  ###
  submitAction: ({currentTarget}) =>
    @props.doAction currentTarget?.dataset?.action

  ###
  # Render actions list
  ###
  renderActions: ->
    for act, idx in @props.actions when act isnt @state.action
      <li key={idx} data-action={act} onClick={@chooseAction}>
        {t "blog.editor.actions.#{act}"}
      </li>

  render: ->
    <div className="button-action button-violet">
      <span
        data-action={@state.action}
        onClick={@submitAction}
        className="button-action-label"
      >{t "blog.editor.actions.#{@state.action}"}</span>
      <span
        tabIndex={-1}
        className="button-action-icon"
        onFocus={@showActions}
        onBlur={@hideActions}
      >
        <ArrowDown />
        <div className="
          button-action-list#{if @state.showPanel then ' active' else ''}
        ">
          <ul>
            {do @renderActions}
          </ul>
        </div>
      </span>
    </div>

module.exports = ActionButton
