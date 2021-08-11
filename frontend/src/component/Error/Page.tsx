import {FC, Fragment} from "react"

import NextError from "next/error"

import PageErrorInterface from "helper/error/PageError"

interface PageErrorProps {
  error?: PageErrorInterface
}

const PageError: FC<PageErrorProps> = ({error, children}) => {
  if (!error) {
    return <Fragment>{children}</Fragment>
  }

  return <NextError {...error} />
}

export default PageError
