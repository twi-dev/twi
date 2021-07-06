import {ObjectType, Field, Root, Int} from "type-graphql"

export interface PageParams<T extends object> {
  /**
   * Returns per-page entities limit
   */
  limit: number

  /**
   * List offset
   */
  offset: number

  /**
   * Current page number
   */
  page: number

  /**
   * The number of the total rows in the list
   */
  count: number

  /**
   * The list of entities
   */
  rows: T[]
}

@ObjectType({isAbstract: true})
export abstract class Page<T extends object> {
  /**
   * Returns total amount of rows in the list.
   */
  @Field(() => Int, {description: "Returns total amount of rows in the list."})
  readonly count!: number

  /**
   * Returns per-page entities limit.
   */
  @Field(() => Int, {description: "Returns per-page entities limit."})
  readonly limit!: number

  /**
   * List offset.
   */
  @Field(() => Int, {description: "List offset."})
  readonly offset!: number

  /**
   * Returns the number of the current page.
   */
  @Field(() => Int, {description: "Returns the number of the current page."})
  current(@Root() {page}: PageParams<T>): number {
    return page
  }

  /**
   * Indicates whether the list has next page or not.
   */
  @Field(() => Boolean, {description: "Indicates if the list has next page."})
  hasNext(@Root() {limit, page, count}: PageParams<T>): boolean {
    if (limit != null && page != null && count != null) {
      return count - limit * page > 0
    }

    return false
  }

  /**
   * Returns the number of the last page.
   */
  @Field(() => Int, {description: "Returns the number of the last page."})
  last(@Root() {limit, page, count}: PageParams<T>): number {
    if (limit != null && page != null && count != null) {
      // The formula: `count / (limit * page)`
      // Where the `count` is the number of all matched rows in database,
      // the `limit` is the values of rows to display per page,
      // and the `page` is the number of the current page.
      return Math.ceil(count / (limit * page))
    }

    return 1
  }

  /**
   * Returns the list of entities.
   */
  abstract list(root: PageParams<T>): T[]
}

export default Page
