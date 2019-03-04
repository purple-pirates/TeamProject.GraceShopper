import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'
const UPDATE_CART_ITEM = 'UPDATE_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

const initialState = {
  cartItems: []
}

const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  payload: cartItems
})

const updateCartItems = (cartItems, change) => ({
  type: UPDATE_CART_ITEM,
  payload: cartItems,
  change
})

const deleteCartItem = itemInfo => ({
  type: DELETE_CART_ITEM,
  payload: itemInfo
})

export const fetchCartItems = () => async dispatch => {
  const {data} = await axios.get('/api/cart')
  dispatch(getCartItems(data))
}

export const putCartItem = (item, change) => async dispatch => {
  const body = {
    ...item,
    change
  }
  await axios.put(`/api/cart/${item.productId}`, body)
  dispatch(updateCartItems(item, change))
}

export const removeCartItem = itemInfo => async dispatch => {
  const {data} = await axios.delete(`/api/cart/${itemInfo.productId}`, {
    data: itemInfo
  })
  data.user
    ? dispatch(deleteCartItem(itemInfo))
    : dispatch(deleteCartItem(data))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {cartItems: action.payload}
    case DELETE_CART_ITEM:
      return !action.payload.cartItem
        ? {
            cartItems: state.cartItems.filter(
              item => item.productId !== action.payload.productId
            )
          }
        : {
            cartItems: action.payload.cartItem
          }
    case UPDATE_CART_ITEM:
      return {
        cartItems: state.cartItems.map(item => {
          const change = action.change === 'up' ? 1 : -1

          item.productId === action.payload.productId &&
            (item.quantity = action.payload.quantity + change)

          return item
        })
      }
    default:
      return state
  }
}
