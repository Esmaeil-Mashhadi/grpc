const { Router } = require("express");
const { productList, createProduct, updateProduct, getProduct, deleteProduct } = require("../controller/product.controller");

const router = Router()
router.get('/list' ,  productList)
router.post('/create' , createProduct)
router.patch('/update/:id' ,  updateProduct)
router.delete('/delete/:id' , deleteProduct)
router.get('/:id' ,  getProduct)


module.exports = {
    productRoutes : router
}