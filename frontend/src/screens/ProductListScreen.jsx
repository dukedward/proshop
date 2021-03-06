import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import {
    listProducts,
    deleteProduct,
    createProduct,
} from '../actions/productActions'
import { useNavigate, useParams } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'
import Meta from '../components/Meta'

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList
    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete
    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login')
        }
        if (successCreate) {
            navigate(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts(keyword, pageNumber))
        }
    }, [
        dispatch,
        navigate,
        keyword,
        pageNumber,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
    ])

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    const deleteProductHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteProduct(id))
        }
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title='Admin | Products' />
                    <Paginate
                        pages={pages}
                        page={page}
                        isAdminProduct
                        keyword={keyword ? keyword : ''}
                    />
                    <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                        variant='dark'
                    >
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products &&
                                products.map((product) => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>${product.price}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>
                                            <LinkContainer
                                                to={`/admin/product/${product._id}/edit`}
                                            >
                                                <Button
                                                    variant='light'
                                                    className='btn-sm'
                                                >
                                                    <i className='fas fa-edit' />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() =>
                                                    deleteProductHandler(
                                                        product._id
                                                    )
                                                }
                                            >
                                                <i className='fas fa-trash' />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    <Paginate
                        pages={pages}
                        page={page}
                        isAdminProduct
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default ProductListScreen
