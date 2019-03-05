import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import {StripeProvider} from 'react-stripe-elements'

const App = () => {
  return (
    <div>
      <Navbar />
      <StripeProvider apiKey="pk_test_APN8EikgFCetmHevbZhBh8LD">
        <Routes />
      </StripeProvider>
    </div>
  )
}

export default App
