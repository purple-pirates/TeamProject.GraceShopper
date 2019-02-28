import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchProducts} from '../store/product'

export class AllProducts extends Component {
  componentDidMount() {
    // console.log('88888', this.props.fetchProducts)
    this.props.fetchProducts()
  }
  render() {
    console.log('HELLOOOOOOOOOOOO', this.props)
    return (
      <div>
        <h1>YOU ARE IN ALL PRODUCTS PAGE</h1>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allProducts: state.product.allProducts
  }
}

const mapDispatchToProps = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)

/*
    const style = {
      height: '180px'
    }

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
      */
