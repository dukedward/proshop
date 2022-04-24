import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
    // Paginate Functionality
    const pageSize = 5
    const page = Number(req.query.pageNumber) || 1

    // Keyword search functionality
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
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
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample Product',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Brand Name',
        category: 'Category Name',
        countInStock: 0,
        numReviews: 0,
        description: 'This is a sample product',
    })

    const createProduct = await product.save()
    res.status(201).json(createProduct)
})

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = req.body.name || product.name
        product.price = req.body.price || product.price
        product.description = req.body.description || product.description
        product.image = req.body.image || product.image
        product.brand = req.body.brand || product.brand
        product.category = req.body.category || product.category
        product.countInStock = req.body.countInStock || product.countInStock

        const updatedProduct = await product.save()

        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create product review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body
    const product = await Product.findById(req.params.id)

    if (product) {
        const alreadyReviwed = product.reviews.find(
            (review) => review.user.toString() === req.user._id.toString()
        )

        if (alreadyReviwed) {
            res.status(400)
            throw new Error('Product already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating =
            product.reviews.reduce((acc, item) => item.rating + acc, 0) /
            product.numReviews

        await product.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)

    res.json(products)
})

export {
    createProduct,
    createProductReview,
    deleteProduct,
    getProductById,
    getProducts,
    getTopProducts,
    updateProduct,
}
