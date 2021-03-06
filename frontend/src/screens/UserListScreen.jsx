import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser } from '../actions/userActions'
import { useNavigate, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import Meta from '../components/Meta'

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const keyword = params.keyword
    const pageNumber = params.pageNumber || 1
    const userList = useSelector((state) => state.userList)
    const { loading, error, users, page, pages } = userList
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers(keyword, pageNumber))
        } else {
            navigate('/login')
        }
    }, [dispatch, navigate, keyword, userInfo, successDelete, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure')) {
            dispatch(deleteUser(id))
        }
    }

    return (
        <>
            <h1>Users: </h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title='Admin | Users' />
                    <Paginate
                        pages={pages}
                        page={page}
                        isAdminUsers
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
                                <th>EMAIL</th>
                                <th>ADMIN</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {users &&
                                users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user._id}</td>
                                        <td>{user.name}</td>
                                        <td>
                                            <a href={`mailto: ${user.email}`}>
                                                {user.email}
                                            </a>
                                        </td>
                                        <td>
                                            {user.isAdmin ? (
                                                <i
                                                    className='fas fa-check'
                                                    style={{ color: 'green' }}
                                                />
                                            ) : (
                                                <i
                                                    className='fas fa-times'
                                                    style={{ color: 'red' }}
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <LinkContainer
                                                to={`/admin/user/${user._id}/edit`}
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
                                                    deleteHandler(user._id)
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
                        isAdminUsers
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default UserListScreen
