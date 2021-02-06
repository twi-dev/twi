import {Fragment} from "react"

import Link from "next/link"

import Title from "component/Title"

import {
  container, content, image, message, code
} from "./not-found.module.css"

const NotFoundError = () => (
  <Fragment>
    <Title title="Oops..." />

    <div className={container}>
      <div className={content}>
        <div className={image}>
          <img src="/not-found-error.svg" alt="" />
        </div>
        <div className={message}>
          <div>There are no books out there, princess!</div>
          <div>
            <Link href="/">
              <a>Should we go back to the home page?</a>
            </Link>
          </div>
        </div>
        <div className={code}>404</div>
      </div>
    </div>
  </Fragment>
)

export default NotFoundError
