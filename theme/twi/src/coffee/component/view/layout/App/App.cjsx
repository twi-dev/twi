{Component} = React = require "react"
{Provider, observer} = require "mobx-react"
{dms, dm, df} = require "decorator"

windowSize = require "helper/dom/windowSize"
AppStore = require "./AppStore"

appStore = new AppStore

{
  pageMainContainer
  pageContent
} = require "./common.styl"


Header = require "../Header/Header"

class App extends Component
  constructor: ->
    {width, height} = do windowSize

    @state = {
      width
      height
    }

  componentWillMount: -> window.addEventListener "resize", @_onWindowResize, no

  _onWindowResize: => {width, height} = do windowSize; @setState {width, height}

  render: ->
    <div
      className="#{pageMainContainer}"
      style={width: @state.width, height: @state.height}
    >
      <Header />
      <div className="#{pageContent}">
        {@props.children}
      </div>
    </div>

module.exports = df observer, App
