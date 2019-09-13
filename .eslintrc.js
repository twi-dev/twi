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
          "package.json": join(__dirname, "package.json")
        }
      }
    }
  },
  "rules": {
    indent: ["error", 2, {
      "MemberExpression": "off"
    }],
    // TODO: Don't forget to move this rule to my personal shared config.
    "prefer-const": ["error", {
      "destructuring": "all"
    }],
    "no-constant-condition": ["error", {
      checkLoops: false
    }],

    "operator-linebreak": ["error", "before"],

    "ava/no-ignored-test-files": 0
  }
}
