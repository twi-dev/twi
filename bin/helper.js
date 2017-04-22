const {resolve} = require("path")
const {statSync} = require("fs")
const {execSync} = require("child_process")

const ROOT = resolve(`${__dirname}/../`)

const IS_YARN_EXISTS = (function() {
  try {
    execSync("which yarn")
    return true
  } catch (err) {
    return false
  }
}())

function tryDeps() {
  try {
    return statSync(`${ROOT}/node_modules/`)
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err
    }

    console.log("Install dependencies before you begin.")
    console.log("Please, be patient.")
    execSync(IS_YARN_EXISTS === true ? "yarn" : "npm i", {
      stdio: "inherit"
    })
  }
}

module.exports = {
  ROOT,
  tryDeps
}
