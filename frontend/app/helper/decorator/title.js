import {createElement} from "react"
import {observer} from "mobx-react"

import DocumentTitle from "react-document-title"

const titleDecorator = title => Target => {
  const name = Target.displayName || Target.name || "Unknown"

  const DecorateTitle = props => {
    title = (props.app && props.app.title) || title || ""

    return createElement(
      DocumentTitle, {title}, createElement(
        observer(Target), {...props}
      )
    )
  }

  DecorateTitle.displayName = `DecorateTitle(${name})`

  return DocumentTitle
}

export default titleDecorator
