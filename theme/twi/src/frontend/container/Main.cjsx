{PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"

AppStore = require "store/container/App"
DocumentTitle = require "react-document-title"

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

componentWillReact = -> console.log "sdf"

componentWillMount = ->
  {width, height} = do windowSize
  @props.app.setViewportDimension {width, height}

  window.addEventListener "resize", resizeAppViewport.bind(this), no

Main = ({app: {width, height, title}, children}) ->
  <DocumentTitle title={title}>
    <div style={{width, height}}>{children}</div>
  </DocumentTitle>

Main.propTypes = app: PropTypes.instanceOf AppStore

module.exports = compose([
  inject mapStoresToProps
  observer
  pure [componentWillMount, componentWillReact]
])(Main)
