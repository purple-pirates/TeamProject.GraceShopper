import React, {Component} from 'react'

export class AllProducts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      products: [
        {
          name: 'The Black Hoodie',
          price: 44.95,
          imageUrl:
            'https://dks.scene7.com/is/image/dkscdn/16NIKMNSWHDPFLCCLNFT_Indigo_Force_White?wid=425',
          description:
            'This is a black hoodie. The best black hoodie ever created.',
          size: 'L',
          merchant: 'misfit merch',
          quantity: 100
        },
        {
          name: 'The Grey Hoodie',
          price: 40.95,
          imageUrl: '',
          description:
            'This is a grey hoodie. The best grey hoodie ever created.',
          size: 'M',
          merchant: 'misfit merch',
          quantity: 100
        },
        {
          name: 'The Burgundy Hoodie',
          price: 42.95,
          imageUrl: '',
          description:
            'This is a burgundy hoodie. The best burgundy hoodie ever created.',
          size: 'XL',
          merchant: 'misfit merch',
          quantity: 100
        }
      ]
    }
  }

  render() {
    const style = {
      height: '180px'
    }
    //Map over all products array and create SingleProduct page for each
    return (
      <div className="allProducts_container">
        {this.state.products.map(product => {
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
