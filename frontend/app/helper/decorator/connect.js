import {createElement} from "react"
import {Provider, observer, inject} from "mobx-react"
import compose from "lodash/fp/compose"

/**
 * Connect MobX store(s) to a Targer component
 *
 * @param object stores – MobX stores that you would like to
 *   connect to your component.
 *
 * @return function
 */
const connect = stores => Target => {
  const name = Target.displayName || Target.name || "Unknown"

  const mapStoresToProps = stores => ({...stores})

  const Connect = props => createElement(
    Provider, {...stores}, createElement(
      compose(inject(mapStoresToProps), observer)(Target), {...props}
    )
  )

  Connect.displayName = `ConnectStores(${name})`

  return Connect
}

export default connect
