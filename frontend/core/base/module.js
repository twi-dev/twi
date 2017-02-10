import {createElement} from "react"

import ModuleContainer from "frontend/core/container/ModuleContainer"

const resolve = async path => (
  await import(`frontend/${path}`)
).default

function wrapModule(component, stores, container) {
  const WrapModule = props => createElement(
    ModuleContainer, {
      ...props, stores
    }, createElement(component)
  )

  WrapModule.displayName = `WrapModule(${component.name})`

  return WrapModule
}

async function buildModule({view, stores, container}, path) {
  const component = await resolve(`module/${path}/${view}`)

  return wrapModule(component, stores, container)
}

export {wrapModule}
export default buildModule
