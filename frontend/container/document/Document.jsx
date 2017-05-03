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

          <meta name="msapplication-TileColor" content="#653089" />
          <meta
            name="msapplication-TileImage"
            content="/static/assets/img/icns/tile/mstile-144.png"
          />

          <meta name="theme-color" content="#653089" />

          {/* Icon for Safari pinned tabs */}
          <link
            rel="mask-icon" color="#653089"
            href="/static/assets/img/layout/twi.svg"
          />

          <link
            rel="shortcut icon"
            href="/static/assets/img/icns/favicon/twi.ico"
          />
          <link
            rel="icon" type="image/png" sizes="16x16"
            href="/static/assets/img/icns/favicon/twi-16.png"
          />
          <link
            rel="icon" type="image/png" sizes="32x32"
            href="/static/assets/img/icns/favicon/twi-32.png"
          />
          <link
            rel="icon" type="image/png" sizes="96x96"
            href="/static/assets/img/icns/favicon/twi-96.png"
          />

          <link
            rel="apple-touch-icon" sizes="57x57"
            href={
              "/static/assets/img/icns/apple-touch-icon" +
              "/57/apple-touch-icon-57.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="60x60"
            href={
              "/static/assets/img/icns/apple-touch-icon" +
              "/60/apple-touch-icon-60.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="72x72"
            href={
              "/static/assets/img/icns/apple-touch-icon" +
              "/72/apple-touch-icon-72.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="76x76"
            href={
              "/static/assets/img/icns/apple-touch-icon" +
              "/76/apple-touch-icon-76.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="114x114"
            href={
              "static/assets/img/icns/apple-touch-icon" +
              "/114/apple-touch-icon-114.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="120x120"
            href={
              "/static/assets/img/icns/apple-touch-icon/" +
              "120/apple-touch-icon-120.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="144x144"
            href={
              "/static/assets/img/icns/apple-touch-icon/" +
              "144/apple-touch-icon-144.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="152x152"
            href={
              "/static/assets/img/icns/apple-touch-icon/" +
              "152/apple-touch-icon-152.png"
            }
          />
          <link
            rel="apple-touch-icon" sizes="180x180"
            href={
              "/static/assets/img/icns/apple-touch-icon/" +
              "180/apple-touch-icon-180.png"
            }
          />
          <link
            rel="icon" type="image/png"
            href="/static/assets/img/icns/chrome/chrome-twi-192.png"
            sizes="192x192"
          />

          <link rel="manifest" href="/static/manifest.json" />
          <link rel="author" type="text/plain" href="/static/humans.txt" />
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
