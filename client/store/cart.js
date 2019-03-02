import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'

const initialState = {
  cartItems: [],
  cart: {}
}

const getCartItems = cartItems => ({
  type: GET_CART_ITEMS,
  payload: cartItems
})

export const fetchCartItems = () => async dispatch => {
  const {data} = await axios.get('/api/cart')

  dispatch(getCartItems(data))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {cartItems: action.payload}
    default:
      return state
  }
}
