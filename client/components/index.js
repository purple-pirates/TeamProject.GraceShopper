/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {default as Footer} from './footer'
export {Login, Signup} from './auth-form'
export {AllProduct} from './allProducts'
export {userProfile} from './profile'
export {UserCart} from './cart'
export {Payment} from './payment'
export {SingleProduct} from './singleProduct'
export {Checkout} from './checkout'
