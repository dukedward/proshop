import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Row, Col, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderActions'
import { USER_PROFILE_UPDATE_RESET } from '../constants/userConstants'
import { LinkContainer } from 'react-router-bootstrap'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const ProfileScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile
    const myOrderList = useSelector((state) => state.myOrderList)
    const {
        loading: loadingOrders,
        error: errorOrders,
        orders,
        pages,
        page,
    } = myOrderList
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    useEffect(() => {
        if (!userInfo) {
            navigate(`/login`)
        } else {
            if (!user.name || success) {
                dispatch({ type: USER_PROFILE_UPDATE_RESET })
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders(keyword, pageNumber))
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [user, userInfo, success, keyword, pageNumber, navigate, dispatch])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Passwords do not match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <>
            <Meta title='Welcome to Proshop | Profile' />
            <Row>
                <Col md={3}>
                    <h2>User Profile</h2>
                    {error && <Message variant='danger'>{error}</Message>}
                    {message && <Message variant='danger'>{message}</Message>}
                    {success && (
                        <Message variant='success'>Profile Updated</Message>
                    )}
                    {loading && <Loader />}
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Enter Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='confirmPassword'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type='password'
                                placeholder='Confirm Password'
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='buttons'>
                            <Button
                                className='mt-3'
                                style={{ width: '100%' }}
                                type='submit'
                                variant='primary'
                            >
                                Update
                            </Button>
                            <Button
                                className='mt-3'
                                style={{ width: '100%' }}
                                onClick={() => {
                                    navigate(-1)
                                }}
                            >
                                Go Back
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={9}>
                    <h2>My Orders</h2>
                    {loadingOrders ? (
                        <Loader />
                    ) : errorOrders ? (
                        <Message variant='danger'>{errorOrders}</Message>
                    ) : (
                        <>
                            <Paginate page={page} pages={pages} isProfile />
                            <Table
                                striped
                                bordered
                                hover
                                responsive
                                variant='dark'
                                className='table-sm'
                            >
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>DATE</th>
                                        <th>TOTAL</th>
                                        <th>PAID</th>
                                        <th>SHIPPED</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => {
                                        return (
                                            <tr key={order._id}>
                                                <td>{order._id}</td>
                                                <td>
                                                    {order.createdAt.substring(
                                                        0,
                                                        10
                                                    )}
                                                </td>
                                                <td>{order.totalPrice}</td>
                                                <td>
                                                    {order.isPaid ? (
                                                        order.paidAt.substring(
                                                            0,
                                                            10
                                                        )
                                                    ) : (
                                                        <i
                                                            className='fas fa-times'
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    {order.isShipped ? (
                                                        order.shippedAt.substring(
                                                            0,
                                                            10
                                                        )
                                                    ) : (
                                                        <i
                                                            className='fas fa-times'
                                                            style={{
                                                                color: 'red',
                                                            }}
                                                        />
                                                    )}
                                                </td>
                                                <td>
                                                    <LinkContainer
                                                        to={`/order/${order._id}`}
                                                    >
                                                        <Button
                                                            className='btn-sm'
                                                            variant='light'
                                                        >
                                                            Details
                                                        </Button>
                                                    </LinkContainer>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </>
                    )}
                </Col>
            </Row>
        </>
    )
}

export default ProfileScreen
