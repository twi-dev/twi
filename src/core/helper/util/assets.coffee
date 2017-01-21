TWI_ROOT = do process.cwd

{readFile} = require "promise-fs"

getAssets = ->
  assets = JSON.parse String await readFile "#{TWI_ROOT}/configs/assets.json"

  return (type) -> bundle[type] or [] for own name, bundle of assets

module.exports = getAssets
