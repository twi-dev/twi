import {fieldsList} from "graphql-fields-list"

import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"

const {Query} = mongoose

const select = node => query => {
  if (!(query instanceof Query) || isEmpty(node)) {
    return query
  }

  return query.select(fieldsList(node))
}

export default select
