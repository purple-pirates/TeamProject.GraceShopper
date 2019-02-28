import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'

/**
 * INITIAL STATE
 */

const initialState = {
  allProducts: []
}

/**
 * ACTION CREATORS
 */

const getProducts = allProducts => ({
  type: GET_PRODUCTS,
  allProducts
})

/**
 * THUNK CREATORS
 */

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const products = await axios.get('/api/products')
      dispatch(getProducts(products.data))
    } catch (error) {
      console.error(error)
    }
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    default:
      return state
  }
}
