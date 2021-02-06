import {forwardRef} from "react"

/** @type {React.FC} */
const Input = forwardRef((props, ref) => (
  <input {...props} ref={ref} />
))

export default Input
