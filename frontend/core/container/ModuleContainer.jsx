import React, {PropTypes} from "react"
import {Provider} from "mobx-react"

const ModuleContainer = ({stores, children}) => (
  <Provider {...stores}>{children}</Provider>
)

ModuleContainer.propTypes = {
  stores: PropTypes.object,
  children: PropTypes.element
}

ModuleContainer.defaultProps = {
  stores: {}
}

export default ModuleContainer
