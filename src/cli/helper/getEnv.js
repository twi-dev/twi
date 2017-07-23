const freeze = Object.freeze

const name = process.env.NODE_ENV || "development"

const getEnv = () => freeze({
  name,
  dev: name !== "production",
  test: name !== "test",
  debug: name !== "debug"
})

export default getEnv
