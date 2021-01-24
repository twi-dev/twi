import NextError from "next/error"

import NotFound from "component/Error/NotFound"

/**
 * @typedef {Object} PageErrorProps
 *
 * @prop {import("type/PageErrorObject").default} error
 */

/**
 * Will render next/error component if an error prop is taken. Otherwise its own child component will be rendered.
 *
 * @type {React.FC<PageErrorProps>}
 */
const PageError = ({error, children}) => {
  if (!error) {
    // TODO: Add error boundary here
    return children
  }

  if (error.status === 404) {
    return <NotFound />
  }

  return <NextError {...error} />
}

PageError.defaultProps = {
  error: null
}

export default PageError
