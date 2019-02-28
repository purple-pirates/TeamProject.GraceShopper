import React, {Component} from 'react'
import {fetchSingleProduct} from '../store/products'
import {connect} from 'react-redux'

export class SingleProduct extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const productId = 1 //this.props.match.params.productId
    console.log('this is productID', productId)
    this.props.fetchSingleProduct(productId)
  }

  render() {
    console.log('in render')
    return (
      <div>
        <h1>You are viewing single products</h1>
      </div>
    )
  }
}

const mapState = state => ({
  singleProduct: state.products.singleProduct
})

const mapDispatch = dispatch => ({
  fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)

// <div>
//   {this.props.singleProduct.name.length < 1 ? null : (
//     <div>
//       <h1>Single Product</h1>
//       <p>{this.props.singleProduct.name}</p>
//     </div>
//   )}
// </div>
