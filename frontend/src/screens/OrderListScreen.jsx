import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listOrders, deleteOrder } from '../actions/orderActions'
import { useNavigate, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const orderList = useSelector((state) => state.orderList)
    const { loading, error, orders, pages, page } = orderList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const orderDelete = useSelector((state) => state.orderDelete)
    const { success: successDelete } = orderDelete
    const navigate = useNavigate()

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listOrders(keyword, pageNumber))
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, keyword, pageNumber, userInfo, successDelete])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteOrder(id))
        }
    }

    return (
        <>
            <h1>Orders: </h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title='Admin | Orders' />
                    <Paginate
                        pages={pages}
                        page={page}
                        isAdminOrders
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
                                <th>USER</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>SHIPPED</th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders &&
                                orders.map((order) => (
                                    <tr key={order._id}>
                                        <td>{order._id}</td>
                                        <td>{order.user && order.user.name}</td>
                                        <td>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td>${order.totalPrice}</td>
                                        <td>
                                            {order.isPaid ? (
                                                order.paidAt.substring(0, 10)
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            {order.isShipped ? (
                                                order.shippedAt.substring(0, 10)
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/order/${order._id}`}
                                            >
                                                <Button
                                                    variant='light'
                                                    className='btn-sm'
                                                >
                                                    Details
                                                </Button>
                                            </LinkContainer>
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/admin/order/${order._id}/edit`}
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
                                                    deleteHandler(order._id)
                                                }
                                            >
                                                <i className='fas fa-trash' />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                </>
            )}
        </>
    )
}

export default OrderListScreen
