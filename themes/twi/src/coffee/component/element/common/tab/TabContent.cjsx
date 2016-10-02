{Component, PropTypes} = React = require "react"

class TabContent extends Component
  @propTypes:
    title: PropTypes.string.isRequired
    children: PropTypes.element.isRequired

  # render: -> {@props.children}

module.exports = TabContent
