import {forwardRef} from "react"

import cn from "classnames"

import {container} from "./button.module.css"

/** @type {React.FC} */
const Button = forwardRef(({className, ...props}, ref) => (
  <button {...props} ref={ref} className={cn(container, className)} />
))

export default Button
