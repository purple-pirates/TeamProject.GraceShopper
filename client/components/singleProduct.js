import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'
class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct()
  }

  render() {
    console.log('Rendering single product!')
    const product = this.state.singleProduct
    console.log(product)
    return (
      <div>
        <h1>You are viewing single products</h1>
      </div>
    )
  }
}

const mapStateToProps = function(state, props) {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatchToProps = function(dispatch, props) {
  const productId = props.match.params.productId
  return {
    fetchSingleProduct() {
      dispatch(fetchSingleProduct(productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
