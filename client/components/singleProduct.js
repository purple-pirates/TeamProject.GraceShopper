import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store'
class SingleProduct extends Component {
  componentDidMount() {
    this.props.fetchSingleProduct()
  }

  render() {
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
  return {
    fetchSingleProduct() {
      dispatch(fetchSingleProduct(props.match.params.productId))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
