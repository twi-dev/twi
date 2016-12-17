{Component} = React = require "react"
{Provider, observer, inject} = require "mobx-react"

windowSize = require "helper/dom/windowSize"
inject = require "helper/store/inject"

{AppStore} = require "./AppStore"

appStore = new AppStore

{
  pageMainContainer
  pageContent
} = require "./common.styl"

Header = require "../Header/Header"

class App extends Component
  constructor: ->
    {width, height} = do windowSize

    @displayName = @constructor.name

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
      <div className="#{pageContent}" style={height: @state.height - 46}>
        {@props.children}
      </div>
    </div>

module.exports = App
