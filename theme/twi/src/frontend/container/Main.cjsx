{PropTypes} = React = require "react"
{inject, observer} = require "mobx-react"
{isObservable} = require "mobx"

compose = require "lodash/fp/compose"

AppStore = require "store/container/App"
DocumentTitle = require "react-document-title"

mapStoresToProps = ({app}) -> ({app})

Main = ({app, children}) ->
  <DocumentTitle title={app.title}>
    <div>{children}</div>
  </DocumentTitle>

Main.propTypes = app: PropTypes.instanceOf AppStore

module.exports = compose([
  inject mapStoresToProps
  observer
])(Main)
