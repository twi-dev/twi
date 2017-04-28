import {Component, createElement} from "react"
import {Provider, observer, inject} from "mobx-react"

import compose from "lodash/fp/compose"
import isEmpty from "lodash/isEmpty"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

const mapStoresToProps = stores => ({...stores})

/**
 * Connect MobX store(s) to a Targer component
 * To connect stores, you could to declare static getInitiaStores method.
 *
 * @param object stores – MobX stores that you would like to
 *   connect to your component.
 *
 * @return Connect
 */
function connect(Target) {
  const name = Target.displayName || Target.name || "Unknown"

  class Connect extends Component {
    static displayName = `Connect(${name})`

    constructor(props) {
      super()

      this.stores = {}

      let stores = {}
      if (isFunction(Target.getInitiaStores)) {
        stores = Target.getInitiaStores(props)
      }

      if (isPlainObject(stores) && !isEmpty(stores)) {
        this.stores = {
          ...this.stores, ...stores
        }
      }
    }

    render() {
      const stores = this.stores

      return createElement(
        Provider, {...stores}, createElement(
          compose(inject(mapStoresToProps), observer)(Target), {
            ...this.props
          }
        )
      )
    }
  }

  if (isFunction(Target.getInitialProps)) {
    Connect.getInitialProps = Target.getInitialProps
  }

  return Connect
}

export default connect
