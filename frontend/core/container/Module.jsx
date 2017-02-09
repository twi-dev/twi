import React, {PropTypes} from "react"
import {Provider} from "mobx-react"

const Module = ({stores, children}) => (
  <Provider {...stores}>{children}</Provider>
)

Module.propTypes = {
  stores: PropTypes.object.isRequired,
  children: PropTypes.element
}

export default Module
