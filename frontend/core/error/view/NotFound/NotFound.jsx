import React, {PropTypes} from "react"
import {Link} from "react-router"
import {inject, observer} from "mobx-react"

import UIStore from "frontend/core/store/UIStore"

import compose from "lodash/fp/compose"
import pure from "frontend/core/helper/decorator/pure"

import {
  mainContainer,
  link,
  image,
  message,
  codeNotFound
} from "./not-found.styl"

const mapStoresToProps = ({ui}) => ({ui})

const NotFound = () => (
  <div className={mainContainer}>
    <div className={image}>
      <img src="/assets/img/errors/404.svg" alt="404" />
    </div>
    <div className={codeNotFound}>404</div>
    <div className={message}>
      This is not the web page you are looking for
    </div>
    <div className={link}>
      <Link to="/">Home</Link>
    </div>
  </div>
)

NotFound.propTypes = {
  ui: PropTypes.instanceOf(UIStore).isRequired
}

function componentWillMount() {
  this.props.ui.setTitle("Page not found")
}

export default compose(
  inject(mapStoresToProps),
  observer,
  pure(componentWillMount)
)(NotFound)
