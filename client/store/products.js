import axios from 'axios'

const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const defaultProduct = {
  singleProduct: {}
}

const getSingleProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  payload: product
})

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

export default function(state = defaultProduct, action) {
  switch (action.type) {
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.payload}
    default:
      return state
  }
}
