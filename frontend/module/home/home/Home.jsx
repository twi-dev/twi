import React, {PropTypes} from "react"
import {inject, observer} from "mobx-react"

import compose from "lodash/fp/compose"
import pure from "frontend/core/helper/decorator/pure"

import UIStore from "frontend/core/store/UIStore"

const mapStoresToProps = ({ui}) => ({ui})

const Home = () => <div>Home</div>

Home.propTypes = {
  ui: PropTypes.instanceOf(UIStore).isRequired
}

function componentWillMount() {
  this.props.ui.setTitle("Библиотека Твайлайт")
}

export default compose(
  inject(mapStoresToProps),
  observer,
  pure(componentWillMount)
)(Home)
