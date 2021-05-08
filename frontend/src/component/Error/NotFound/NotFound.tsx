import {Fragment} from "react"

import Link from "next/link"

import Title from "component/Title"

import s from "./not-found.module.css"

const NotFoundError = () => (
  <Fragment>
    <Title title="Oops..." />

    <div className={s.container}>
      <div className={s.content}>
        <div className={s.image}>
          <img src="/not-found-error.svg" alt="" />
        </div>
        <div className={s.message}>
          <div>There are no books out there, princess!</div>
          <div>
            <Link href="/">
              <a>Should we go back to the home page?</a>
            </Link>
          </div>
        </div>
        <div className={s.code}>404</div>
      </div>
    </div>
  </Fragment>
)

export default NotFoundError
