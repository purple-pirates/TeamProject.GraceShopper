import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
/**
 * INITIAL STATE
 */

const initialState = {
  allProducts: [],
  singleProduct: {}
}

/**
 * ACTION CREATORS
 */

const getProducts = allProducts => ({
  type: GET_PRODUCTS,
  allProducts
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  payload: product
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

export const fetchSingleProduct = productId => async dispatch => {
  try {
    console.log('here')
    const {data} = await axios.get(`/api/products/${productId}`)
    console.log('this is the data', data)
    // dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.allProducts}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.payload}
    default:
      return state
  }
}
