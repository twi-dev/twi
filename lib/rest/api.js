import axios from "redaxios"

import {format} from "url"

import cast from "lib/helper/util/castType"

/** @type {axios} */
const client = axios.create({
  baseURL: format({
    protocol: cast(process.env.NEXT_PUBLIC_SERVER_HTTPS) ? "https" : "http",
    hostname: process.env.NEXT_PUBLIC_SERVER_HOST,
    port: process.env.NEXT_PUBLIC_SERVER_PORT,
    pathname: process.env.NEXT_PUBLIC_API_ENDPOINT
  })
})

export default client
