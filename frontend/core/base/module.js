import {createElement} from "react"

import ModuleContainer from "frontend/core/container/ModuleContainer"

const resolve = async path => (
  await import(`frontend/module/${path}`)
).default

function wrapModule(component, stores, container) {
  const WrapModule = props => createElement(
    ModuleContainer, {...props, stores}, createElement(component)
  )

  WrapModule.displayName = `WrapModule(${component.name})`

  return WrapModule
}

async function buildModule({view, stores, container}, path) {
  // function getComponent(state, cb) {
  //   const onFulfilled = component => cb(
  //     wrapModule(component, stores || {}, container)
  //   )

  //   const onRejected = err => console.error(err)

  //   resolve(component).then(onFulfilled, onRejected)
  // }

  // return getComponent

  // console.log(await resolve(component))

  const component = await resolve(`${path}/${view}`)

  return wrapModule(component, stores, container)
}

export {wrapModule}
export default buildModule
