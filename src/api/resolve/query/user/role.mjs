import findKey from "core/helper/iterator/sync/objFindKey"
import User from "db/model/User"

const getRoleName = ({role}) => (
  findKey(User.roles, value => value === role).toUpperCase()
)

export default getRoleName
