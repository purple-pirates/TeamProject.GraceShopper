import axios from 'axios'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// INITIAL STATE

const initialState = {
  allProducts: [],
  singleProduct: {}
}

// ACTION CREATORS

const getProducts = products => ({
  type: GET_PRODUCTS,
  payload: products
})

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  payload: product
})

// THUNK CREATORS

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProduct = productId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${productId}`)
    dispatch(getSingleProduct(data))
  } catch (error) {
    console.error(error)
  }
}

// REDUCER

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {...state, allProducts: action.payload}
    case GET_SINGLE_PRODUCT:
      return action.payload
    default:
      return state
  }
}
