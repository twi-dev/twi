const {join} = require("path")

module.exports = {
  "parser": "babel-eslint",
  "plugins": [
    "ava"
  ],
  "extends": [
    "@octetstream",
    "plugin:ava/recommended"
  ],
  "settings": {
    "import/resolver": {
      "babel-module": {
        cwd: __dirname,
        root: ["src"],
        alias: {
          "packag.json": join(__dirname, "package.json")
        }
      }
    }
  },
  "rules": {
    "indent": ["error", 2, {
      "MemberExpression": "off"
    }],

    "operator-linebreak": ["error", "before"],

    "ava/no-ignored-test-files": 0
  }
}
