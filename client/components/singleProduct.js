import React, {Component} from 'react'
import {fetchSingleProduct} from '../store/product'
import {connect} from 'react-redux'

export class SingleProduct extends Component {
  componentDidMount() {
    const productId = 1 //this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
  }

  render() {
    return (
      <div>
        <h1>You are viewing single products</h1>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  singleProduct: state.product.singleProduct
})

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// <div>
//   {this.props.singleProduct.name.length < 1 ? null : (
//     <div>
//       <h1>Single Product</h1>
//       <p>{this.props.singleProduct.name}</p>
//     </div>
//   )}
// </div>
