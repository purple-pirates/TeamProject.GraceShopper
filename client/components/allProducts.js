import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/products'

class AllProducts extends Component {
  componentDidMount() {
    this.props.fetchProducts()
  }
  render() {
    const style = {
      height: '180px'
    }
    console.log('Props')
    //Map over all products array and create SingleProduct page for each
    return (
      <div className="allProducts_container">
        {this.props.allProducts.map(product => {
          return (
            <div key={product.id} className="product">
              <img src={product.imageUrl} style={style} />
              <p>{product.name}</p>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.products.allProducts
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
