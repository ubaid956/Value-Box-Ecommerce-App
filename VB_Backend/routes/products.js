import express from 'express'

import {getAllProducts, addProduct} from '../Controllers/product.js'
const productRoute = express.Router()

productRoute.get('/', getAllProducts)
productRoute.post('/add', addProduct)

export default productRoute