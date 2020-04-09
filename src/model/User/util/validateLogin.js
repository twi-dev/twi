/**
 * Check if a given login is valid
 *
 * @param {string} value login – a string representing a user's login
 */
const validateLogin = value => /^[a-z0-9-_.]+$/i.test(value)

export default validateLogin
