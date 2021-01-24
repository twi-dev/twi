import {
  GraphQLInt as TInt,
  GraphQLBoolean as TBoolean,
  getNamedType,
  isNonNullType
} from "graphql"

import Type from "parasprite/Type"

const {isArray} = Array

const rowsToList = ({rows}) => rows

const getCurrent = ({page}) => page

const getHasNext = ({limit, page, count}) => count - (limit * page) > 0

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

  return Type({
    name: typeName,
    description: "Returns a page frame and navigation information."
  })
    .field({
      name: "count",
      type: TInt,
      required: true,
      description: "Returns the total number of rows"
    })
    .field({
      name: "limit",
      type: TInt,
      required: true,
      description: "Returns the actual limit of per-page entities"
    })
    .field({
      name: "offset",
      type: TInt,
      required: true,
      description: "Returns the zero-indexed offset from the start"
    })
    .resolve({
      name: "current",
      type: TInt,
      required: true,
      noArgs: true,
      handler: getCurrent,
      description: "Returns the number of the current page"
    })
    .resolve({
      name: "hasNext",
      type: TBoolean,
      required: true,
      noArgs: true,
      handler: getHasNext,
      description: "Returns \"true\" when the next page exists, "
        + "\"false\" for otherwise"
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
      handler: rowsToList,
      description: "Returns the rows for the current page"
    })
  .end()
}

export default createPageType
