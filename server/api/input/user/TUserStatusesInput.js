import {GraphQLEnumType as Enum} from "graphql"

const TUserStatusesInput = new Enum({
  name: "UserStatusesInput",
  values: {
    inactive: {
      value: "inactive"
    },
    active: {
      value: "active"
    },
    suspended: {
      value: "suspended"
    },
    deleted: {
      value: "deleted"
    }
  }
})

export default TUserStatusesInput
