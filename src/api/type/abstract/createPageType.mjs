import {
  GraphQLInt as TInt,
  GraphQLBoolean as TBoolean,
  getNamedType,
  isNonNullType
} from "graphql"

import Type from "parasprite/Type"

const {isArray} = Array

const rowsToList = ({rows}) => rows

const hasNextPage = ({limit, page, count}) => count - (limit * page) > 0

const getLastPage = ({limit, page, count}) => Math.ceil(count / (limit * page))

function getTypeInfo(t) {
  if (isArray(t)) {
    return t
  }

  return [getNamedType(t), isNonNullType(t)]
}

function createPageType({type: target, isRequired, ...field}) {
  const [t, nonNullableFlag] = getTypeInfo(target)

  const typeName = t.name.endsWith("Page") ? t.name : `${t.name}Page`

  return Type(typeName)
    .field({
      name: "count",
      type: TInt,
      required: true
    })
    .field({
      name: "limit",
      type: TInt,
      required: true,
      description: "Return the actual limit of per-page entities"
    })
    .field({
      name: "offset",
      type: TInt,
      required: true
    })
    .field({
      name: "page",
      type: TInt,
      required: true
    })
    .resolve({
      name: "hasNextPage",
      type: TBoolean,
      required: true,
      noArgs: true,
      handler: hasNextPage
    })
    .resolve({
      name: "last",
      type: TInt,
      required: true,
      noArgs: true,
      handler: getLastPage,
      description: "Returns the number of the last page"
    })
    .resolve({
      ...field,

      name: "list",
      type: [t, nonNullableFlag],
      required: isRequired == null ? true : isRequired,
      noArgs: true,
      handler: rowsToList
    })
  .end()
}

export default createPageType
