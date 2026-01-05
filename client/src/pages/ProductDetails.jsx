import { useParams, useNavigate } from 'react-router-dom';
import { useState, memo, useCallback } from 'react';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById, loading: productsLoading } = useProducts();
  const { addToCart } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const product = productsLoading ? null : getProductById(id);

  const handleQuantityChange = useCallback((delta) => {
    setQuantity(prev => Math.max(1, prev + delta));
  }, []);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addToCart(product, quantity);
    }
  }, [product, quantity, addToCart]);

  if (productsLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-24">
        <h2 className="text-xl font-bold text-white mb-4">Product not found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3.5 gradient-primary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 font-medium text-sm btn-premium"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-text-secondary hover:text-gold mb-8 transition-all duration-200 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium">Back</span>
      </button>

      <div className="glass-card-premium rounded-2xl border border-white/10 overflow-hidden depth-gradient">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-10 md:p-12">
          
          {/* Image Section */}
          <div className="flex items-center justify-center p-8 glass rounded-2xl border border-white/10 image-zoom-container">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[500px] object-contain image-zoom"
              onError={(e) => { e.target.src = 'https://placehold.co/600?text=No+Image'; }}
            />
          </div>

          {/* Info Section */}
          <div className="flex flex-col">
            <span className="text-accent font-semibold uppercase tracking-wider text-xs mb-3 glass px-4 py-1.5 rounded-full inline-block w-fit">
              {product.category}
            </span>
            
            <h1 className="text-4xl font-bold text-white mb-6 leading-tight">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-7">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={18} 
                    fill={i < (product.rating?.rate || 4.5) ? "currentColor" : "none"}
                    className={i < (product.rating?.rate || 4.5) ? "text-gold" : "text-text-muted"}
                  />
                ))}
              </div>
              <span className="text-text-secondary text-sm font-medium">
                ({product.rating?.count || 120} reviews)
              </span>
            </div>

            <p className="text-text-secondary mb-8 leading-relaxed text-base">
              {product.description}
            </p>

            <div className="text-4xl font-bold text-white mb-10">
              ₹{product.price.toLocaleString('en-IN')}
            </div>

            <div className="mt-auto space-y-6">
              <div className="flex items-center gap-6">
                <span className="font-semibold text-white">Quantity:</span>
                <div className="flex items-center glass-card border border-white/20 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => handleQuantityChange(-1)}
                    className="p-3.5 hover:bg-white/10 transition-colors duration-200 text-white"
                    disabled={quantity <= 1}
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-16 text-center font-bold text-white">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)}
                    className="p-3.5 hover:bg-white/10 transition-colors duration-200 text-white"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                className="w-full md:w-auto px-12 py-4 gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 flex items-center justify-center gap-3 text-base btn-premium"
              >
                <ShoppingCart size={20} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductDetails);
