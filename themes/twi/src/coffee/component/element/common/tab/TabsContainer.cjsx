{Component, PropTypes} = React = require "react"
Tab = require "./TabContent"

class TabsContainer extends Component
  @propTypes:
    children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired
    defaultActive: PropTypes.number

  _renderTabs: ->
    for child, idx in @props.children
      <div key={idx + 1} className="tabs-title">{child.props.title}</div>

  render: ->
    <div className="tabs-main-container">
      {do @_renderTabs}
    </div>

module.exports = TabsContainer
