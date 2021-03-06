import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,
    LIST_MY_ORDER_REQUEST,
    LIST_MY_ORDER_SUCCESS,
    LIST_MY_ORDER_FAIL,
    LIST_MY_ORDER_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_DELETE_REQUEST,
    ORDER_DELETE_SUCCESS,
    ORDER_DELETE_FAIL,
    ORDER_SHIP_REQUEST,
    ORDER_SHIP_SUCCESS,
    ORDER_SHIP_FAIL,
    ORDER_SHIP_RESET,
} from '../constants/orderConstants'

export const orderCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { loading: true }
        case ORDER_CREATE_SUCCESS:
            return { loading: false, success: true, order: action.payload }
        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDetailsReducer = (
    state = { loading: true, orderItems: [], shippingAddress: {} },
    action
) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return { loading: true }
        case ORDER_PAY_SUCCESS:
            return { loading: false, success: true }
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const myOrdersListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case LIST_MY_ORDER_REQUEST:
            return { loading: true }
        case LIST_MY_ORDER_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case LIST_MY_ORDER_FAIL:
            return { loading: false, error: action.payload }
        case LIST_MY_ORDER_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderListReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return { loading: true }
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload.orders,
                page: action.payload.page,
                pages: action.payload.pages,
            }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_DELETE_REQUEST:
            return { loading: true }
        case ORDER_DELETE_SUCCESS:
            return { loading: false, success: true }
        case ORDER_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const orderShipReducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_SHIP_REQUEST:
            return { loading: true }
        case ORDER_SHIP_SUCCESS:
            return { loading: false, success: true }
        case ORDER_SHIP_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_SHIP_RESET:
            return {}
        default:
            return state
    }
}
