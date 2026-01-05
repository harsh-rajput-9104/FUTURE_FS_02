import { Link } from 'react-router-dom';
import { memo } from 'react';
import { useCart } from '../context/CartContext';
import { Plus } from 'lucide-react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="glass-card-premium rounded-2xl overflow-hidden border border-white/10 flex flex-col h-full group card-hover-lift depth-gradient">
      <Link to={`/product/${product.id}`} className="block relative pt-[75%] overflow-hidden bg-gradient-to-br from-white/5 to-white/0 image-zoom-container">
        <img 
          src={product.image} 
          alt={product.title}
          className="absolute top-0 left-0 w-full h-full object-contain p-3 image-zoom"
          onError={(e) => { e.target.src = 'https://placehold.co/600?text=No+Image'; }}
        />
        {product.featured && (
          <div className="absolute top-3 left-3 bg-gold-gradient text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg z-10 hover-glow-gold">
            ✨ FEATURED
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-3">
          <span className="text-[10px] font-semibold text-accent uppercase tracking-wide glass px-2.5 py-1 rounded-full inline-block">
            {product.category}
          </span>
        </div>
        
        <Link to={`/product/${product.id}`} className="block mb-4 flex-grow">
          <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-accent transition-colors duration-200 leading-snug" title={product.title}>
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between gap-3 mt-auto">
          <span className="text-xl font-bold text-white">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-10 h-10 gradient-primary rounded-full hover:shadow-lg hover:shadow-primary/50 transition-all duration-200 flex items-center justify-center btn-premium flex-shrink-0"
            aria-label="Add to cart"
          >
            <Plus size={18} strokeWidth={2.5} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
