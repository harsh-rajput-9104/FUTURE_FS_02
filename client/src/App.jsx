import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <ProductProvider>
        <CartProvider>
          <div className="min-h-screen text-white">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                },
                success: {
                  iconTheme: {
                    primary: '#00E5FF',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </CartProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
