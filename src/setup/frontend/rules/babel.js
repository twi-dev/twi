import {readFileSync} from "fs"

// const isArray = Array.isArray

const ROOT = process.cwd()

// function addFrontendRoot(val) {
//   if (isArray(val) && val[0] === "module-resolver") {
//     const ref = val[1]

//     // Change plugin CWD and alias for frontend
//     ref.cwd = ROOT

//     ref.alias = {
//       frontend: "./frontend"
//     }

//     ref.extensions = [
//       ".js", ".jsx", ".json",
//       ".styl", ".css", ".svg"
//     ]

//     // Update plugin config
//     val[1] = ref
//   }

//   return val
// }

const BABELRC = (function() {
  const config = JSON.parse(String(readFileSync(`${ROOT}/.babelrc`)))

  // config.plugins = config.plugins.map(addFrontendRoot)

  // Add dynamic imports
  config.plugins.push("babel-plugin-dynamic-import-webpack")

  return config
}())

function babel(isDev) {
  const part = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: "babel-loader",
        query: {
          babelrc: false, // Turn off babelrc
          ...BABELRC
        }
      }
    ]
  }

  if (isDev) {
    part.use = [
      {
        loader: "react-hot-loader/webpack"
      },
      ...part.use
    ]
  }

  return part
}

export default babel
