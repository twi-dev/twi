import {createElement} from "react"
import {observer} from "mobx-react"
import DocumentTitle from "react-document-title"

import isFunction from "lodash/isFunction"

const decorateTitle = Target => {
  const name = Target.displayName || Target.name || "Unknown"

  const Title = props => {
    const title = (props.app && props.app.title) || ""

    return createElement(
      DocumentTitle, {title}, createElement(
        observer(Target), {
          ...props
        }
      )
    )
  }

  if (isFunction(Target.getInitialProps)) {
    Title.getInitialProps = Target.getInitialProps
  }

  if (isFunction(Target.getInitialStores)) {
    Title.getInitialStores = Target.getInitialStores
  }

  Title.displayName = `DecorateTitle(${name})`

  return Title
}

export default decorateTitle
