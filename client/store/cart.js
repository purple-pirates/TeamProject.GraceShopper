import axios from 'axios'

const GET_CART_ITEMS = 'GET_CART_ITEMS'

const initialState = {
  cartItems: [],
  cart: {}
}

const getCartItems = payload => ({
  type: GET_CART_ITEMS,
  cartItems: payload
})

export const fetchCartItems = () => async dispatch => {
  const {data} = await axios.get('/api/cart')

  dispatch(getCartItems(data))
}

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CART_ITEMS:
      return {cartItems: action.cartItems}
    default:
      return state
  }
}
