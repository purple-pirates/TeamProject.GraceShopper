import React from 'react'
import {connect} from 'react-redux'

function Profile(props) {
  return (
    <div>
      <div>
        <img src={props.userInfo.imageUrl} width="200" />
        <h1>
          {props.userInfo.firstName} {props.userInfo.lastName}
        </h1>
        <h4>Email: {props.userInfo.email || 'N/A'}</h4>
        <h4>Street: {props.userInfo.street || 'N/A'}</h4>
        <h4>City: {props.userInfo.city || 'N/A'}</h4>
        <h4>State: {props.userInfo.state || 'N/A'}</h4>
        <h4>Zip: {props.userInfo.zip || 'N/A'}</h4>
        <h4>Phone: {props.userInfo.phone || 'N/A'}</h4>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    userInfo: state.user
  }
}

export const userProfile = connect(mapStateToProps)(Profile)
