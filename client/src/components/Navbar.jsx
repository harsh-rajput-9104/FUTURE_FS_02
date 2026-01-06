import { Link } from 'react-router-dom';
import { memo } from 'react';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { getCartCount } = useCart();

  return (
    <nav 
      className="sticky top-0 z-50 will-change-tt bg-gradient-to-r from-[#0f1324] via-[#12172a] to-[#0f1324] border-b border-white/10 navbar-height"
      style={{ 
        margin: 0
      }}
    >
      <div
        className="app-content-x navbar-height flex justify-between items-center"
      >

        <Link to="/" className="flex items-center gap-2.5 group -ml-25"
        style={{ left: '-60px' }}
        >
          <div className="relative">
            <Store size={30} className="text-white transition-all duration-300 group-hover:text-gold" />
            <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity bg-gold"></div>
          </div>
          <span className="text-xl font-bold text-gradient">Zwyntra</span>
        </Link>
        
        <div className="flex items-center justify-center gap-6 h-full relative"
        style={{ right: '100px' }}
        >
          <Link 
            to="/" 
            className="flex items-center h-11 text-text-secondary hover:text-white font-medium transition-all duration-200 relative group text-sm"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-gradient group-hover:w-full transition-all duration-200"></span>
          </Link>
          
          <Link 
            to="/cart" 
            className="relative group flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 hover:bg-white/10 transition"
          >
            <div className="relative">
              <ShoppingCart 
                size={20} 
                className="text-text-secondary group-hover:text-gold transition-all duration-200" 
              />
              {getCartCount() > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-gradient text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse shadow-lg">
                  {getCartCount()}
                </span>
              )}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(255,191,0,0.4)] rounded-full"></div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default memo(Navbar);
