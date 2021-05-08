const compose = require("next-compose-plugins")
const gql = require("next-plugin-graphql")
const svgr = require("next-plugin-svgr")
const preact = require("next-plugin-preact")

module.exports = compose([gql, svgr, preact], {distDir: "lib"})
