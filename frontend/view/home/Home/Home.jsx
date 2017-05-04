import React from "react"
import {string} from "prop-types"

import compose from "lodash/fp/compose"

import connect from "frontend/helper/decorator/connect"
import title from "frontend/helper/decorator/title"
import gql from "frontend/transport/graphql"

import Application from "frontend/store/Application"

import greet from "./greet.graphql"

const getGreeting = async name => (await gql.query({
  query: greet,
  variables: {
    name
  }
})).data.greet

const Home = ({greet}) => <div>{greet}</div>

// 1. Run all needed API calls to get initial props for stores
Home.getInitialProps = async () => ({
  greet: await getGreeting("OctetStream")
})

// 2. Init stores that you need for this page and return them.
Home.getInitialStores = () => {
  const app = new Application({
    title: "Twilight's Library – Feed"
  })

  return {app}
}

Home.propTypes = {
  greet: string.isRequired
}

export default compose(connect, title)(Home)
