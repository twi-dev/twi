import {forwardRef} from "react"

import cn from "classnames"

import {container} from "./input.module.css"

/** @type {React.FC<React.HTMLAttributes<HTMLInputElement>} */
const Input = forwardRef(({className, ...props}, ref) => (
  <input {...props} ref={ref} className={cn(container, className)} />
))

export default Input
