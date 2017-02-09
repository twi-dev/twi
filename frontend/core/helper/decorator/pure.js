import {Component, createElement, PropTypes} from "react"
import {observer} from "mobx-react"

import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"
import isArray from "lodash/isArray"

// List of allowed React lifecycle methods
const allowed = [
  "componentWillMount",
  "componentDidMount",
  "componentWillReceiveProps",
  "componentWillUpdate",
  "shouldComponentUpdate",
  "componentWillUpdate",
  "componentDidUpdate",
  "componentWillUnmount",

  "componentWillReact"
]

function pure(methods) {
  if (isFunction(methods)) {
    methods = [methods]
  }

  if (isEmpty(methods)) {
    throw new Error("Methods cannot be empty.")
  }

  if (!isArray(methods)) {
    throw new TypeError(
      "Methods should be passed as array of functions or as a single function."
    )
  }

  return function wrapFunctionalComponent(Target) {
    if (!isFunction(Target)) {
      throw new TypeError("Target component should be a function.")
    }

    if (isEmpty(Target.name)) {
      throw new TypeError("Anonymous components are not allowed.")
    }

    class Pure extends Component {
      static propTypes = {
        children: PropTypes.any
      }

      render() {
        return createElement(observer(Target), this.props, this.props.children)
      }
    }

    for (const method of methods) {
      if (!allowed.includes(method.name)) {
        throw new Error("Allowed only React and MobX-React lifecycle methods.")
      }

      // Important note: We cannot rebind an arrow function.
      //   So, use an old function declaration syntax instead.
      Pure.prototype[method.name] = method
    }

    Pure.displayName = `${Pure.name}(${Target.name})`

    return Pure
  }
}

export default pure
