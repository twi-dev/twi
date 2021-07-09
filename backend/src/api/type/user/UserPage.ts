import {ObjectType, Root, Field} from "type-graphql"

import {Page, PageParams, PageResult} from "api/type/abstract/Page"

import {User} from "entity/User"

export type UserPageParams = PageParams<User>

export type UserPageResult = PageResult<UserPage>

@ObjectType()
export class UserPage extends Page<User> {
  @Field(() => [User], {
    nullable: "items",
    description: "Returns the list of users."
  })
  list(@Root() {rows}: UserPageParams): User[] {
    return rows
  }
}
