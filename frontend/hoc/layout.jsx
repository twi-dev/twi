import getName from "lib/helper/component/getName"

/**
 * Applies given Layout to the Target component
 *
 * @param {Function} Layout
 * @param {Object.<string, any>} [layoutProps]
 */
const withLayout = (Layout, layoutProps) => Target => {
  /** @type {React.FC} */
  const WithLayout = props => (
    <Layout {...layoutProps}>
      <Target {...props} />
    </Layout>
  )

  WithLayout.displayName = `With${getName(Layout)}(${getName(Target)})`

  return WithLayout
}

export default withLayout
