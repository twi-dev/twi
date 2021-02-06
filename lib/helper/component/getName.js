/**
 * Returns given component's name
 *
 * @param {{name?: string, displayName?: string, constructor?: Function}} [component]
 *
 * @return {string}
 *
 * @example
 *
 * const MyComponent = () => <div>This is my component</div>
 *
 * getName(MyComponent) // => "MyComponent"
 */
const getName = ({name, displayName, constructor} = {}) => (
  displayName || name || constructor?.name || "Anonymous"
)

export default getName
