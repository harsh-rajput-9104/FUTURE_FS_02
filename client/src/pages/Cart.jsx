import { Link, useNavigate } from 'react-router-dom';
import { memo, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = useCallback(() => {
    navigate('/checkout');
  }, [navigate]);

  if (cart.length === 0) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <p className="text-text-secondary mb-8 text-sm">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/"
          className="inline-flex items-center justify-center px-8 py-4 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 btn-premium"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-white mb-10">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-5">
          {cart.map(item => (
            <div key={item.id} className="glass-card-premium p-6 rounded-2xl border border-white/10 flex gap-5 items-center group hover:border-gold-muted/30 transition-all duration-200 depth-gradient">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-32 h-32 object-contain p-3 glass rounded-xl border border-white/10"
                onError={(e) => { e.target.src = 'https://placehold.co/400?text=No+Image'; }}
              />
              
              <div className="flex-grow">
                <Link to={`/product/${item.id}`} className="font-semibold text-base text-white hover:text-gold line-clamp-2 transition-colors duration-200">
                  {item.title}
                </Link>
                <p className="text-text-secondary text-xs mb-3 capitalize mt-1">{item.category}</p>
                <div className="font-bold text-xl text-white">₹{item.price.toLocaleString('en-IN')}</div>
              </div>

              <div className="flex flex-col items-end gap-4">
                <div className="flex items-center glass-card border border-white/20 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2.5 hover:bg-white/10 transition-colors duration-150 text-white"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center text-sm font-bold text-white">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2.5 hover:bg-white/10 transition-colors duration-150 text-white"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-300 text-sm flex items-center gap-2 transition-colors duration-200 font-medium"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors duration-200 mt-2"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass-card-premium p-7 rounded-2xl border border-white/10 sticky top-24 depth-gradient">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-text-secondary">
                <span>Subtotal</span>
                <span className="font-medium text-white">₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Shipping</span>
                <span className="font-medium text-gold">Free</span>
              </div>
              <div className="flex justify-between text-text-secondary">
                <span>Tax (Estimated)</span>
                <span className="font-medium text-white">₹{(getCartTotal() * 0.1).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
              <div className="border-t border-white/10 pt-4 flex justify-between font-bold text-lg text-white">
                <span>Total</span>
                <span>₹{(getCartTotal() * 1.1).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="w-full py-4 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 flex items-center justify-center gap-2.5 text-base btn-premium"
            >
              Proceed to Checkout
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Cart);
