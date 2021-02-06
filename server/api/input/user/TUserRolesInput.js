import {GraphQLEnumType as Enum} from "graphql"

const TUserRolesInput = new Enum({
  name: "UserRolesInput",
  values: {
    super: {
      value: "super"
    },
    developer: {
      value: "developer"
    },
    admin: {
      value: "admin"
    },
    moderator: {
      value: "moderator"
    },
    support: {
      value: "support"
    },
    tech: {
      value: "tech"
    },
    user: {
      value: "user"
    }
  }
})

export default TUserRolesInput
