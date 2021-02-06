import {Toaster} from "react-hot-toast"
import {Fragment} from "react"

import "style/common.css"
import "style/spacing.css"

import Title from "component/Title"
import PageLayout from "layout/Page"
import PageError from "component/Error/PageError"

/**
 * @typedef {import("next/app").AppProps} AppProps
 */

/** @type {React.FC<AppProps>} */
const Application = ({Component, pageProps}) => {
  const {error, ...props} = pageProps

  return (
    <Fragment>
      <Title title="Twilight's Library" />

      <PageLayout>
        <PageError error={error}>
          <Component {...props} />

          <Toaster position="bottom-center" />
        </PageError>
      </PageLayout>
    </Fragment>
  )
}

export default Application
