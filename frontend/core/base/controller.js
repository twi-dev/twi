import buildModule from "./module"

const MANIFEST_PATTERN = /\/manifest.json$/

const manifests = (
  require.context("frontend/module", true, MANIFEST_PATTERN)
    .keys()
    .filter(m => MANIFEST_PATTERN.test(m))
    .map(m => require("frontend/module/" + m.replace(/^\.\//, "")))
)

const buildComponent = component => function getComponent(state, cb) {
  const onFulfilled = view => cb(view)

  const onRejected = err => console.error(err)

  buildModule(component).then(onFulfilled, onRejected)
}

const makeRoute = ({path, component}) => ({
  path: path,
  getComponent: buildComponent(component)
})

const makeRoutes = manifests => manifests.map(makeRoute)

const routes = {
  childRoutes: [{
    path: "/",
    component: "",
    childRoutes: makeRoutes(manifests)
  }, {
    path: "*"
  }]
}

export default routes
