mobxReact = require "mobx-react"

inject = (injector, component) -> mobxReact.inject(injector)(component)

module.exports = inject
