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
    console.log(product)
    return (
      <div id="single_product_container">
        <div id="single_product_subcontainer">
          <div id="single_product_textcontainer">
            <h1>{product.name}</h1>
            <h3>Price: {product.price}</h3>
            <h3>
              Size:{' '}
              {
                <select>
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                  <option>Extra Large</option>
                  <option>XX Large</option>
                </select>
              }
            </h3>
            <h3>
              {
                <form>
                  <label htmlFor="quantity">Quantity: </label>
                  <input
                    min="1"
                    type="number"
                    id="quantity"
                    name="quantity"
                    value="1"
                  />
                </form>
              }
            </h3>
            <h3>Description: {product.description}</h3>
          </div>
          <img
            src={product.imageUrl}
            alt="product image"
            id="single_product_img"
          />
        </div>
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
