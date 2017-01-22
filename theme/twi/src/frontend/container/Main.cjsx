React = require "react"
{inject, observer} = require "mobx-react"

compose = require "lodash/fp/compose"
pure = require "helper/decorator/pure"
windowSize = require "helper/dom/windowSize"

mapStoresToProps = ({app}) -> ({app})

###
# "this" === Pure instance
###
resizeAppViewport = ->
  {width, height} = do windowSize
  @props.app.setViewportDimension {width, height}

componentWillMount = ->
  {width, height} = do windowSize
  @props.app.setViewportDimension {width, height}

  window.addEventListener "resize", resizeAppViewport.bind(this), no

Main = ({children}) -> <div>{children}</div>

module.exports = compose([
  inject(mapStoresToProps)
  observer
  pure componentWillMount
])(Main)
