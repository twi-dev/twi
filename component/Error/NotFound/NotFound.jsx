import {Fragment} from "react"

import Title from "component/Title"

import {
  container,
  content,
  message,
  status
} from "./not-found.module.css"

// TODO: Improve page design
/**
 * @type {React.FC}
 */
const NotFound = () => (
  <Fragment>
    <Title title="Page not found" />

    <div className={container}>
      <div className={content}>
        <div className={message}>
          <h1 className={status}>
            404
          </h1>

          <div>
            This page could not be found.
          </div>
        </div>
      </div>
    </div>
  </Fragment>
)

export default NotFound
