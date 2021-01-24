/**
 * @param {{name?: string, displayName?: string, constructor?: Function}} [component]
 *
 * @return {string}
 */
const getName = ({name, displayName, constructor} = {}) => (
  displayName || name || constructor?.name || "Anonymous"
)

export default getName
