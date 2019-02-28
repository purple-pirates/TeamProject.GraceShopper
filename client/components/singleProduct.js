import React, {Component} from 'react'
import axios from 'axios'
// import {fetchSingleProduct} from '../store/product'
// import {connect} from 'react-redux'

export default class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      currentProduct: {}
    }
  }

  async componentDidMount() {
    const productId = this.props.match.params.productId
    const selectedProduct = await axios.get(`/api/products/${productId}`)
    this.setState({currentProduct: selectedProduct.data})
  }

  render() {
    const product = this.state.currentProduct
    console.log(product)
    return (
      <div>
        <h1>You are viewing single products</h1>
      </div>
    )
  }
}
