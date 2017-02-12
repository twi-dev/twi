import React from "react"
import {inject, observer} from "mobx-react"

import compose from "lodash/fp/compose"
import pure from "frontend/core/helper/decorator/pure"

const mapStoresToProps = ({ui}) => ({ui})

const About = () => <div>About</div>

function componentWillMount() {
  this.props.ui.setTitle("About")
}

export default compose(
  inject(mapStoresToProps),
  observer,
  pure(componentWillMount)
)(About)
