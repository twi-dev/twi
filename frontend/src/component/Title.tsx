import {FC} from "react"

import Head from "next/head"

interface TitleProps {
  title?: string
}

const Title: FC<TitleProps> = ({title: pageTitle}) => (
  <Head>
    <title>{pageTitle}</title>
  </Head>
)

export default Title
