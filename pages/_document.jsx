import Base, {Html, Head, Main, NextScript} from "next/document"

class Document extends Base {
  render() {
    return (
      <Html lang="en">
        <Head />

        <body className="dark">
          <script src="/dark-mode.js" />

          <Main />

          <NextScript />
        </body>
      </Html>
    )
  }
}

export default Document
