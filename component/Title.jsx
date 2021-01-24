import Head from "next/head"

/** @type {React.FC<{title?: string}>} */
const Title = ({title: pageTitle}) => (
  <Head>
    <title>{pageTitle}</title>
  </Head>
)

export default Title
