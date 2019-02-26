import React, {Component} from 'react'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleSubmit(evt) {
    // console.log('changing..', evt.target.value)
    evt.preventDefault()
  }
  handleChange(evt) {
    console.log('changing..', evt.target.value)
    this.setState({searchTerm: evt.target.value})
  }
  render() {
    //input form for searching our products
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search for products"
            value={this.state.searchTerm}
            onChange={this.handleChange}
          />
        </form>
      </div>
    )
  }
}
