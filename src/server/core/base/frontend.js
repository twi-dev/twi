import assets from "core/helper/util/assets"

// Just serve app container
const actionIndex = async ctx => await ctx.render("layout/root", {
  getAssets: await assets()
})

export default actionIndex
