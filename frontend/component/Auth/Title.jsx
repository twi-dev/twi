import {Fragment} from "react"

import Title from "component/Title"

import {title} from "./auth.module.css"

/** @type {React.FC<{title: string, compact?: boolean}>} */
const AuthTitle = ({title: formTitle, compact}) => (
  <Fragment>
    <Title title={formTitle} />

    <h1 className={title} data-compact={compact}>{formTitle}</h1>
  </Fragment>
)

export default AuthTitle
