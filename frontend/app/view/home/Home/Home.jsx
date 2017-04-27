import React, {Component} from "react"
import {observable} from "mobx"

import connect from "frontend/app/helper/decorator/connect"

// class Application {
//   @observable random = 0
// }

// @connect
// class Home extends Component {
//   // static async getInitialProps() {
//   //   const app = new Application()

//   //   return {
//   //     stores: {
//   //       app
//   //     }
//   //   }
//   // }

//   // static getInitiaStores(props) {
//   //   return {
//   //     app: new Application()
//   //   }
//   // }

//   onClick = () => this.props.stores.app.random = String(Math.random())

//   render() {
//     const onClick = this.onClick

//     console.log(this.props)

//     return (
//       <div {...{onClick}}>
//         Click to get random number: {this.props.stores.app.random}
//       </div>
//     )
//   }
// }

const Home = () => <div>Yay!</div>

export default Home
