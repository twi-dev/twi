import {fieldsList} from "graphql-fields-list"

import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"

const {Query} = mongoose

const select = params => query => {
  if (!(query instanceof Query) || isEmpty(params.node)) {
    return query
  }

  return query.select(fieldsList(params.node))
}

export default select
