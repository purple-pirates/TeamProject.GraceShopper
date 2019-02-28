import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'
class SelectedProduct extends Component {
  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
  }

  render() {
    console.log('Product: ', this.props.singleProduct)
    return (
      <div>
        <h1>You are viewing single products</h1>
      </div>
    )
  }
}

const mapStateToProps = function(state) {
  return {
    singleProduct: state.singleProduct
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
