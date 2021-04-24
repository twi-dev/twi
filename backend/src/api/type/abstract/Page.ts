import {ObjectType, Field, Root, Int} from "type-graphql"

export interface PageParams<T extends object> {
  limit: number

  offset: number

  page: number

  count: number

  rows: T[]
}

@ObjectType({isAbstract: true})
export abstract class Page<T extends object> {
  /**
   * Returns the number of the total rows in the list
   */
  @Field(() => Int)
  readonly count!: number

  /**
   * Returns per-page entities limit
   */
  @Field(() => Int)
  readonly limit!: number

  /**
   * List offset
   */
  @Field(() => Int)
  readonly offset!: number

  /**
   * Returns the number of the current page
   */
  @Field(() => Int)
  current(@Root() {page}: PageParams<T>): number {
    return page
  }

  /**
   * Indicates whether the list has next page or not
   */
  @Field(() => Boolean)
  hasNext(@Root() {limit, page, count}: PageParams<T>): boolean {
    if (limit != null && page != null && count != null) {
      return count - limit * page > 0
    }

    return false
  }

  /**
   * Returns the number of the past page
   */
  @Field(() => Int)
  last(@Root() {limit, page, count}: PageParams<T>): number {
    if (limit != null && page != null && count != null) {
      return Math.ceil(count / (limit * page))
    }

    return 1
  }

  /**
   * Returns the list of entities
   */
  abstract list(root: PageParams<T>): T[]
}

export default Page
