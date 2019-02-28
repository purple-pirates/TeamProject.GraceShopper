import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {fetchProducts} from '../store/product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    // const style = {
    //   height: '180px',
    //   width: '200px',
    //   backgroundColor: 'orange'
    // }

    return (
      <div className="allProducts_container">
        {this.props.allProducts.map(product => {
          console.log(product.imageUrl)
          return (
            <div key={product.id} className="product">
              <div className="product__img">
                <Link to="singleProduct">
                  <img src={product.imageUrl} alt="product image" />
                </Link>
              </div>
              <div>
                <p>{product.name}</p>
                <p>{product.price}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  allProducts: state.product.allProducts
})

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export const AllProduct = connect(mapStateToProps, mapDispatchToProps)(
  AllProducts
)
