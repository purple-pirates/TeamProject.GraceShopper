import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {getProducts} from '../store/products'

class AllProducts extends Component {
  // componentDidMount() {
  //   this.props.getProducts()
  // }
  render() {
    console.log(this.props)
    const style = {
      height: '180px'
    }
    const products = this.props
    //Map over all products array and create SingleProduct page for each
    return (
      <div className="allProducts_container">
        {products.map(product => {
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
  getProducts: () => dispatch(getProducts())
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AllProducts)
)
