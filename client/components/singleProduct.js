import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'
class SelectedProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div>
        <h1>{product.name}</h1>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    singleProduct: state.product.singleProduct
  }
}

const mapDispatchToProps = function(dispatch) {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SelectedProduct
)
