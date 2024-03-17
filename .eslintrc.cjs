module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    "@nuxtjs/eslint-config-typescript"
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        ".eslintrc.{js,cjs}"
      ],
      parserOptions: {
        sourceType: "script"
      }
    }
  ],
  parserOptions: {
    ecmaVersion: "latest",
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: [
    "@typescript-eslint",
    "vue"
  ],
  rules: {
    "no-use-before-define": 0,
    "no-console": 0,
    "linebreak-style": [
      "error",
      "unix"
    ],
    quotes: [
      "error",
      "double"
    ],
    semi: [
      "error",
      "never"
    ],
    "require-await": 0,
    "arrow-parens": [
      "error",
      "as-needed"
    ],
    "object-curly-spacing": [
      "error",
      "never"
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "never",
        asyncArrow: "always"
      }
    ],
    "prefer-const": ["error", {
      destructuring: "all"
    }],
    "operator-linebreak": ["error", "before"],

    // Indent
    indent: "off",
    "@typescript-eslint/indent": [
      "error",

      2,

      {
        SwitchCase: 1,
        flatTernaryExpressions: false,
        offsetTernaryExpressions: false,
        ignoredNodes: [
          "PropertyDefinition[decorators]"
        ]
      }
    ],

    "import/order": [
      "error",

      {
        pathGroups: [
          {
            pattern: "#auth",
            group: "external"
          },
          {
            pattern: "#imports",
            group: "external"
          },
          {
            pattern: "#components",
            group: "external"
          }
        ]
      }
    ],

    "vue/mustache-interpolation-spacing": [
      "error",
      "never"
    ],

    "vue/multi-word-component-names": 0,
    "vue/html-self-closing": 0,
    "vue/component-tags-order": [
      "error",

      {
        order: ["script", "style", "template"]
      }
    ]
  }
}
