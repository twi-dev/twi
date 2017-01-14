import {Component, PropTypes} from "react"
import windowSize from "helper/dom/windowSize"

class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  constructor(props) {
    super()

    const {width, height} = windowSize()

    this.state = {
      width,
      height,
      title: props.children.type.title || "Библиотека Твайлайт"
    }
  }

  componentWillMount() {
    window.addEventListener("resize", this._onWindowResize, false)
  }

  componentWillReceiveProps({children: {type: {title}}}) {
    title || (title = "Библиотека Твайлайт")

    this.setState({title})
  }

  _onWindowResize = () => {
    const {width, height} = windowSize()

    this.setState({width, height})
  }

  render() {}
}

export default App
