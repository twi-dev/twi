import {forwardRef, useMemo} from "react"

import cn from "classnames"

import {container, primary} from "./button.module.css"

const variants = {primary}

/** @type {React.FC<React.HTMLAttributes<HTMLButtonElement> & {variant: "primary" | "secondary"}>} */
const Button = forwardRef(
  ({className, variant: variantName, ...props}, ref) => {
    const variant = useMemo(() => variants[variantName], [variantName])

    return (
      <button
        {...props}
        ref={ref}
        className={cn(container, variant, className)}
      />
    )
  }
)

Button.defaultProps = {
  variant: "primary"
}

export default Button
