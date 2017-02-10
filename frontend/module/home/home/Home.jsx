import React from "react"
import {inject, observer} from "mobx-react"

import compose from "lodash/fp/compose"
import pure from "frontend/core/helper/decorator/pure"

const mapStoresToProps = ({ui}) => ({ui})

const Home = ({ui: {title}}) => <div>Home {title || "foo"}</div>

function componentWillMount() {
  console.log(this.props.ui.title)
  this.props.ui.setTitle("Библиотека Твайлайт")
}

export default compose(
  inject(mapStoresToProps),
  observer,
  pure(componentWillMount)
)(Home)
