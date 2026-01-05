import { useState, memo, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });

  if (cart.length === 0 && !orderComplete) {
    navigate('/');
    return null;
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    const mockOrderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    setOrderId(mockOrderId);
    setOrderComplete(true);
    clearCart();
    setIsSubmitting(false);
    toast.success('Order placed successfully!');
  }, [clearCart]);

  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto text-center py-24">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <CheckCircle className="text-gold w-24 h-24" />
            <div className="absolute inset-0 blur-2xl bg-gold/30 animate-pulse"></div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-6">Thank You for Your Order!</h1>
        <p className="text-text-secondary mb-10 text-base leading-relaxed">
          Your order has been placed successfully. We've sent a confirmation email to {formData.email}.
        </p>
        <div className="glass-card-premium p-7 rounded-2xl max-w-md mx-auto mb-10 border border-white/10 depth-gradient">
          <p className="text-sm text-text-secondary mb-3">Order ID</p>
          <p className="text-xl font-mono font-bold text-gold">{orderId}</p>
        </div>
        <button 
          onClick={() => navigate('/')}
          className="px-12 py-4 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 text-base btn-premium"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-white mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">Shipping Information</h2>
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Phone Number</label>
              <input
                type="tel"
                name="phone"
                required
                className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">Address</label>
              <input
                type="text"
                name="address"
                required
                className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                value={formData.address}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">ZIP Code</label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  className="w-full px-4 py-3 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200 text-sm"
                  value={formData.zipCode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="glass-card-premium p-7 rounded-2xl h-fit border border-white/10 depth-gradient">
          <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item.id} className="flex gap-4 text-sm">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-16 h-16 object-contain glass rounded-xl p-2 border border-white/10"
                  onError={(e) => { e.target.src = 'https://placehold.co/400?text=No+Image'; }}
                />
                <div className="flex-grow">
                  <p className="font-medium text-white line-clamp-2">{item.title}</p>
                  <p className="text-text-secondary">Qty: {item.quantity}</p>
                </div>
                <div className="font-bold text-white">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 pt-6 space-y-3 mb-6">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal</span>
              <span className="font-medium text-white">₹{getCartTotal().toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Shipping</span>
              <span className="font-medium text-gold">Free</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Tax (10%)</span>
              <span className="font-medium text-white">₹{(getCartTotal() * 0.1).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-white pt-3 border-t border-white/10">
              <span>Total</span>
              <span>₹{(getCartTotal() * 1.1).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
            </div>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full py-4 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-base btn-premium"
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
            ) : (
              'Place Order'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Checkout);
