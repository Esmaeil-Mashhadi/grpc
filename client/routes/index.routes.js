const { Router } = require("express");
const { productRoutes } = require("./product.routes");
const { blogRoutes } = require("./blog.routes");

const router  = Router()

router.use('/product' , productRoutes)
router.use('/blog' , blogRoutes)

module.exports = {
    allRoutes : router
}