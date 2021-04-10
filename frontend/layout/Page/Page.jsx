import {container} from "./page.module.css"

/**
 * The default page layout
 *
 * @type {React.FC}
 */
const Page = ({children}) => <div className={container}>{children}</div>

export default Page
