// @prefix("/")
class HomeController {
  // @route("/")
  async actionHome({view}) {
    // do something...
    await view("home/Home", {
      title: "Home Page"
    })
  }
}

export default HomeController
