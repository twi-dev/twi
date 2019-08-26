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

  query.select(flat(fields))

  const queryFields = fieldsList(node)

  if (isEmpty(queryFields)) {
    return query
  }

  if (!isEmpty(query.model.alwaysSelect)) {
    query.select(query.model.alwaysSelect)
  }

  return query.select(queryFields)
}

export default select
