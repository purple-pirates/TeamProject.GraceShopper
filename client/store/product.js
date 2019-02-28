import axios from 'axios'

// ACTION TYPES

export const GET_PRODUCTS = 'GET_PRODUCTS'
export const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

// INITIAL STATE

const initialState = {
  allProducts: [],
  singleProduct: {}
}

// ACTION CREATORS

export const getProducts = products => ({
  type: GET_PRODUCTS,
  payload: products
})

export const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  payload: product
})

// THUNK CREATORS

export const fetchProducts = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    console.log('DATA FROM FETCH PRODUCTS IS: ', data)
    dispatch(getProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const fetchSingleProduct = productId => async dispatch => {
  try {
    console.log('IN FETCHSINGLE PRODUCT')
    const {data} = await axios.get(`/api/products/${productId}`)
    console.log('this is the data', data)
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
      return {...state, singleProduct: action.payload}
    default:
      return state
  }
}
