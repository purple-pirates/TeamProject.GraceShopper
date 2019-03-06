import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <nav>
      <Link to="/home">
        <img
          src="https://s3.amazonaws.com/purple-pirate-pompadours/misfitlogo.png"
          alt="misfit logo"
          id="logo"
        />
      </Link>
      <div className="navbar-links">
        <Link to="/products">Products</Link>
        {isLoggedIn ? (
          <span>
            <Link to="/profile">Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </span>
        ) : (
          <span>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/cart">Cart</Link>
          </span>
        )}
      </div>
    </nav>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
