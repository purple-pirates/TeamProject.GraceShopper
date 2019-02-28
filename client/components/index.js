/**
 * `components/index.js` exists simply as a 'central export' for our components.
 * This way, we can import all of our components from the same place, rather than
 * having to figure out which file they belong to!
 */
export {default as Navbar} from './navbar'
export {default as UserHome} from './user-home'
export {Login, Signup} from './auth-form'
export {AllProduct} from './allProducts'
export {About} from './about'
export {Search} from './search'
export {Profile} from './profile'
export {Cart} from './cart'
export {Checkout} from './checkout'
export {SingleProduct} from './singleProduct'
