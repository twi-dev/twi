import assets from "../helper/util/assets"

// Just serve app comtainer
const actionIndex = async ctx => await ctx.render("layout/root", {
  getAssets: await assets()
})

export default actionIndex
