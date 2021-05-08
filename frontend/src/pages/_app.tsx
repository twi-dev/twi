import {Toaster} from "react-hot-toast"
import {AppProps} from "next/app"
import {FC} from "preact/compat"

import Title from "component/Title"
import PageError from "component/Error/Page"

import PageLayout from "layout/Page"

const Page: FC<AppProps> = ({Component, pageProps}) => {
  const {error, ...props} = pageProps

  return (
    <>
      <Title title="Twilight's Library" />

      <PageLayout>
        <PageError error={error}>
          <Component {...props} />

          <Toaster position="bottom-right" />
        </PageError>
      </PageLayout>
    </>
  )
}

export default Page
