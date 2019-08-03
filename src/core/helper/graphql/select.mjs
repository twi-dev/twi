import {fieldsList} from "graphql-fields-list"

import isEmpty from "lodash/isEmpty"
import mongoose from "mongoose"

import flat from "core/helper/array/flat"

const {Query} = mongoose

/**
 * Calls .select method on given query using requested fields from
 * the current GraphQL operation. Optionally can apply additional fields.
 *
 * @param {object} node
 * @param {string[]} fields
 *
 * @return {Function} – A function that takes the query and applies fields to
 * its .select() method
 */
const select = (node, ...fields) => query => {
  if (!(query instanceof Query) || isEmpty(node)) {
    return query
  }

  return query.select(fieldsList(node).concat(flat(fields)))
}

export default select
