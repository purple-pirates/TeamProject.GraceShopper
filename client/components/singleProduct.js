import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct, addProduct} from '../store'
class SelectedProduct extends Component {
  constructor() {
    super()
    this.state = {
      size: 'Medium',
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
    // console.log('state after update: ', this.state)
  }

  handleSubmit(e) {
    // PLACEHOLDER: alert to be replaced with redirect to shopping cart view
    // alert('your order has been submitted!')

    e.preventDefault()
    const productId = this.props.match.params.productId
    const orderInfo = {
      id: this.props.singleProduct.id,
      size: this.state.size,
      quantity: this.state.quantity,
      name: this.props.singleProduct.name
    }

    this.props.addProduct(orderInfo, productId)
    // this.props.isLoggedIn
    //   ? this.props.addProduct(orderInfo, productId)
    //   : console.log('sessions')
  }

  componentDidMount() {
    const productId = this.props.match.params.productId
    this.props.fetchSingleProduct(productId)
  }

  render() {
    const product = this.props.singleProduct
    return (
      <div id="single_product_container">
        <div id="single_product_subcontainer">
          <div id="single_product_textcontainer">
            <h1>{product.name}</h1>
            <h3>Price: {product.price}</h3>
            <h3>Description: {product.description}</h3>
            <form id="add_single_product" onSubmit={this.handleSubmit}>
              <h3>
                Size:{' '}
                {
                  <select
                    onChange={this.handleChange}
                    name="size"
                    value={this.state.size}
                  >
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
                  <div>
                    <label htmlFor="quantity">Quantity: </label>
                    <input
                      min="1"
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={this.state.quantity}
                      onChange={this.handleChange}
                    />
                  </div>
                }
              </h3>
              <span className="input-group-btn">
                <button className="btn-default" type="submit">
                  Add to cart
                </button>
              </span>
            </form>
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
    singleProduct: state.product.singleProduct,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatchToProps = dispatch => ({
  fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
  addProduct: (orderInfo, productId) =>
    dispatch(addProduct(orderInfo, productId))
})

export const SingleProduct = connect(mapStateToProps, mapDispatchToProps)(
  SelectedProduct
)
