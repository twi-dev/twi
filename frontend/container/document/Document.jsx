import React from "react"

import Document, {
  Head, Main, NextScript as Script
} from "next/document"

class TwiDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <link rel="stylesheet" href="/static/assets/css/reset.css" />
          <meta
            name="viewport"
            content={
              "user-scalable=no, width=device-width," +
              "initial-scale=1, maximum-scale=1"
            }
          />
        </Head>
        <body>
          <Main />
          <Script />
        </body>
      </html>
    )
  }
}

export default TwiDocument
