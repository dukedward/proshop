import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Delete product by ID
// @route DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: `Product: ${product.name} has been removed!!` })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc Create new product
// @route POST /api/products
// @access Public
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, category, brand } = req.body
    const productExists = await Product.findOne({ name })

    if (productExists) {
        res.status(400)
        throw new Error('Product exists already')
    }

    const product = await Product.create({
        name,
        price,
        category,
        brand,
    })

    if (product) {
        res.status(201).json({
            _id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            brand: product.brand,
        })
    } else {
        res.status(400)
        throw new Error('Invalid product data')
    }
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.category = req.body.category || product.category
        product.brand = req.body.brand || product.brand

        const updatedProduct = await product.save()

        res.json({
            _id: updatedProduct._id,
            name: updatedProduct.name,
            price: updatedProduct.price,
            category: updatedProduct.category,
            brand: updateProduct.brand,
        })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
}
