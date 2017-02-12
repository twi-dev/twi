import {createElement} from "react"

import ModuleContainer from "frontend/core/container/ModuleContainer"
import Page from "frontend/core/container/Page"

const resolve = async path => (
  await import(`frontend/${path}`)
).default

function wrapModule(component, stores, container) {
  const WrapModule = props => createElement(
    ModuleContainer, {
      ...props, stores
    }, createElement(Page, null, createElement(component))
  )

  WrapModule.displayName = `WrapModule(${
    component.displayName || component.name || "Unknown"
  })`

  return WrapModule
}

async function buildModule({view, stores, container}, path) {
  const component = await resolve(`module/${path}/${view}`)

  return wrapModule(component, stores, container)
}

export {wrapModule}
export default buildModule
