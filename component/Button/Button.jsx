import {forwardRef} from "react"

/** @type {React.FC} */
const Button = forwardRef((props, ref) => (
  <button {...props} ref={ref} />
))

export default Button
