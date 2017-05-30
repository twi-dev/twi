You can describe schemas as an external modules at this derectory.
The should export function as default:

```js
  const getModelFields = types => ({
    someField: types.TString // All builtin types have a prefix "T"
  })

  // You **SHOULD** always export things **AFTER** module implementation.
  export default getModelFields
```
