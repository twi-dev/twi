# Contributing guidelines of Twilight's Library project

First of all, thank you so much for taking the time to contribute! You're awesome!

Following document is the set of our contributing guidelines.
It also includes all the Twilight's Library (aka "Twi") documentation.
Feel free to report bugs, purpose the new features or open pull requests.

## Table of content

1. What should I know before I get started?

  * [Code of Conduct](#code-of-conduct)
  * [Code style guidelines](#code-style-guidelines)

## Code of Conduct

Please read our [Code of Conduct](code-of-conduct.md) before you begin to contribute our ptoject!

## Code style guidelines

Our code guidelines based on [Airbnb JavaScript Guidelines](https://github.com/airbnb/javascript).
We're also using ESLint for linting all Twi's codebase and
Editorconfig to automatically set-up basic files formatting.

Our extensions for Airbnb JavaScript Guidelines:

1. Use **double** quotes instead of **single** quotes.

2. Use **function declaration** or **function expression**, but don't mix it!

3. Modules **always** should be separated to 3 parts _dependencies_, _implementation_ and _exports_ like so:

```js
// Dependencies
import {GraphQLString as TString} from "graphql"
import Type from "parasprite/Type"

// Implementation
const TUser = Type("User")
  /* some field of type */
.end()

// Exports from current module
export default TUser // default export

export {TUSer} // named export
```
