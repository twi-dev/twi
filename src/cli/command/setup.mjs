import installer from "setup"

const description = "run Twi's setup script."

const setup = (...args) => installer(...args)

export default setup
export {
  description
}
