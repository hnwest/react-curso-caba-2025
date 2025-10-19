import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header  from '@components/Header'
import Footer  from '@components/Footer'

import Home    from '@components/Home'
import Catalog from '@components/Catalog'
import Cart    from '@components/Cart'
import ProductDetails from '@components/ProductDetails'

import '@styles/App.css'

function App() {
  return ( 
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
          <main className="flex-1 container mx-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>
        <Footer />
      </div>
    </Router> 
  )
}

export default App
