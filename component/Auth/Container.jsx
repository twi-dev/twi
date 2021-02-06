import {container} from "./auth.module.css"

/** @type {React.FC} */
const Container = ({children}) => <div className={container}>{children}</div>

Container.displayName = "AuthContainer"

export default Container
