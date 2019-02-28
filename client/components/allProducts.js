import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const style = {
      height: '180px'
    }
    return (
      <div className="allProducts_container">
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id} className="product">
              <img src={product.imageUrl} style={style} />
              <p>{product.name}</p>
              <p>{product.price}</p>
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
