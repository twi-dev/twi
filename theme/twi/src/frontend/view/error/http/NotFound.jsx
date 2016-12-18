import React from "react"
import {Link} from "react-router"

import {
  mainContainer,
  link,
  image,
  message,
  codeNotFound
} from "./http.styl"

function NotFound() {
  return (
    <div className={`${mainContainer}`}>
      <div className={`${image}`}>
        <img src="/assets/img/errors/404.svg" alt="404" />
      </div>
      <div className={`${codeNotFound}`}>404</div>
      <div className={`${message}`}>
        This is not the web page you are looking for
      </div>
      <div className={`${link}`}>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}

export default NotFound
