import {fields} from "./auth.module.css"

/** @type {React.FC<{compact?: boolean}>} */
const Fields = ({compact, children}) => (
  <div className={fields} data-compact={compact}>
    {children}
  </div>
)

export default Fields
