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
        <h4>Email: {props.userInfo.email}</h4>
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
