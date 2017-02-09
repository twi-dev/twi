import {createElement} from "react"
import {dirname} from "path"

import Module from "frontend/core/container/Module"

const resolve = async path => (
  await import(`frontend/module/${path}`)
)

const wrapModule = (component, stores = {}, container = null) => createElement(
  Module, {stores}, container
    ? createElement(container, null, component)
    : component
)

async function buildModule(component) {
  // function getComponent(state, cb) {
  //   const onFulfilled = component => cb(
  //     wrapModule(component, stores, container)
  //   )

  //   const onRejected = err => console.error(err)

  //   resolve(component).then(onFulfilled, onRejected)
  // }

  // return getComponent
}

export default buildModule
