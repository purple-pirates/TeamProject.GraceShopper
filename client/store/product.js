import axios from 'axios'

// ACTION TYPES

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'

// INITIAL STATE

const initialState = {
  allProducts: [],
  singleProduct: {},
  cart: false
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

const getAddProduct = product => ({
  type: ADD_PRODUCT,
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

export const addProduct = (orderInfo, productId) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/cart/${productId}`, orderInfo)
    dispatch(getAddProduct(data))
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
      return {...state, singleProduct: action.payload}
    case ADD_PRODUCT:
      return {...state, cart: !state.cart}
    default:
      return state
  }
}
