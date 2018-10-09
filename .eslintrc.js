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
        root: ["src"]
      }
    }
  },
  "rules": {
    "no-shadow": 0,
    "operator-linebreak": ["error", "after"],

    "indent": ["error", 2, {
      "MemberExpression": "off"
    }],

    "ava/no-ignored-test-files": ["error", {
      "files": [
        "src/test/unit/**/*.mjs"
      ]
    }]
  }
}
