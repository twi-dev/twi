const compose = require("next-compose-plugins")
const gql = require("next-plugin-graphql")
const svgr = require("next-plugin-svgr")

module.exports = compose([gql, svgr], {distDir: "lib"})
