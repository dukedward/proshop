import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({
    pages,
    page,
    isProfile = false,
    isAdminProduct = false,
    isAdminOrders = false,
    isAdminUsers = false,
    keyword = '',
}) => {
    return (
        pages > 1 && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            isAdminProduct
                                ? `/admin/productlist/${x + 1}`
                                : isAdminOrders
                                ? `/admin/orderlist/${x + 1}`
                                : isAdminUsers
                                ? `/admin/userlist/${x + 1}`
                                : isProfile
                                ? `/profile/${x + 1}`
                                : keyword
                                ? `/search/${keyword}/page/${x + 1}`
                                : `/page/${x + 1}`
                        }
                    >
                        <Pagination.Item active={x + 1 === page}>
                            {x + 1}
                        </Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    )
}

export default Paginate
