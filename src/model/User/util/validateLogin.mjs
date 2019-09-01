const validateLogin = value => /^[a-z0-9-_.]+$/i.test(value)

export default validateLogin
