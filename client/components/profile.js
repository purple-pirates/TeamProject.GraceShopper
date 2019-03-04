import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUpdateUser} from '../store'

class Profile extends React.Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {}

  handleSubmit(e) {
    e.preventDefault()
    const userId = this.props.match.params.userId
    const updatedStudent = {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value
    }
    this.props.updateStudent(userId, updatedStudent)
  }

  componentDidMount() {}

  render = () => {
    console.log('USER INFO PROPS: ', this.props.userInfo)
    return (
      <div>
        {this.props.userInfo.length < 1 ? (
          <h3>This user has no information to update.</h3>
        ) : (
          <div>
            <img src={this.props.userInfo.imageUrl} width="200" />
            <h1>
              {this.props.userInfo.firstName} {this.props.userInfo.lastName}
            </h1>
            <span className="input-group-btn">
              <button className="btn-default" type="submit">
                Edit profile
              </button>
            </span>
            <h4>Email: {this.props.userInfo.email || 'N/A'}</h4>
            <h4>Street: {this.props.userInfo.street || 'N/A'}</h4>
            <h4>City: {this.props.userInfo.city || 'N/A'}</h4>
            <h4>State: {this.props.userInfo.state || 'N/A'}</h4>
            <h4>Zip: {this.props.userInfo.zip || 'N/A'}</h4>
            <h4>Phone: {this.props.userInfo.phone || 'N/A'}</h4>
            <form id="update-user-form" onSubmit={this.handleSubmit}>
              <h3>Submit the form below to update this user: </h3>
              <label htmlFor="name"> First Name: </label>
              <input
                className="form-control"
                name="firstName"
                type="text"
                placeholder={this.props.userInfo.firstName}
              />
              <label htmlFor="name"> Last Name: </label>
              <input
                className="form-control"
                type="text"
                name="lastName"
                placeholder={this.props.userInfo.lastName}
              />
              <label htmlFor="name"> Email Address: </label>
              <input
                className="form-control"
                type="text"
                name="email"
                placeholder={this.props.userInfo.email}
              />
              <span className="input-group-btn">
                <button className="btn-default" type="submit">
                  Submit
                </button>
              </span>
            </form>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  userInfo: state.user
})

const mapDispatchToProps = dispatch => ({
  updateStudent: (userId, updatedUser) =>
    dispatch(getUpdateUser(userId, updatedUser))
})

export const userProfile = connect(mapStateToProps, mapDispatchToProps)(Profile)
