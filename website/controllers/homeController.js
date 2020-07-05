const homeController = {
    index: (req,res) => {
        res.render("index")
    },
    aboutUs: (req,res) => {
        res.render("about-us")
    }
}

module.exports = homeController;