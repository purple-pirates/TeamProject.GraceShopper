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

const updateCartItems = cartItems => ({
  type: UPDATE_CART_ITEM,
  payload: cartItems
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
  await axios.put(`/api/cart/${item.productId}`)
  dispatch(updateCartItems(item, change))
}

export const removeCartItem = itemInfo => async dispatch => {
  await axios.delete(`/api/cart/${itemInfo.productId}`)
  dispatch(deleteCartItem(itemInfo))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {cartItems: action.payload}
    case DELETE_CART_ITEM:
      return {
        cartItems: state.cartItems.filter(
          item => item.productId !== action.payload.productId
        )
      }
    case UPDATE_CART_ITEM:
      console.log('update cart reducer', state.cartItems)

      return {
        cartItems: state.cartItems.map(item => {
          item.productId === action.payload.productId &&
            (action.payload.quantity = action.payload.quantity + 1)
        })
        // cartItems: action.payload
        // cartItems: action.payload.map(item => {
        //   if (item.productId === action.payload.productId) {
        //     item.quantity += 1
        //   }
        // })
      }
    default:
      return state
  }
}
