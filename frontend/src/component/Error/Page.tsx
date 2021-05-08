import {FC} from "preact/compat"

import NextError from "next/error"

import PageErrorInterface from "helper/error/PageError"

interface PageErrorProps {
  error?: PageErrorInterface
}

const PageError: FC<PageErrorProps> = ({error, children}) => {
  if (!error) {
    return <>{children}</>
  }

  return <NextError {...error} />
}

export default PageError
