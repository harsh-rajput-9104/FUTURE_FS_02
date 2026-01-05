import { useState, useMemo, useRef, useEffect, memo, useCallback } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Star, ArrowRight, X, Menu, Sparkles } from 'lucide-react';

const CategorySidebar = memo(({ selectedCategory, categoryCounts, categories, onSelect, isMobile = false }) => (
  <div className={`${isMobile ? 'glass-card' : 'glass border-r border-white/10'} h-full flex flex-col`}>
    <h3 className={`font-semibold text-white ${isMobile ? 'text-base mb-4 px-2' : 'text-xs uppercase tracking-wider px-6 py-6 border-b border-white/10'}`}>
      {isMobile ? 'Categories' : '✨ Filters'}
    </h3>
    <div className={`space-y-1.5 overflow-y-auto flex-1 ${isMobile ? 'p-4' : 'p-3'}`}>
      <button
        onClick={() => onSelect('all')}
        className={`w-full text-left transition-all duration-200 flex justify-between items-center group rounded-xl ${
          isMobile ? 'px-4 py-3' : 'px-4 py-3'
        } ${
          selectedCategory === 'all'
            ? 'glass-strong text-white border border-gold-muted shadow-lg shadow-gold/10'
            : 'text-text-secondary hover:glass hover:text-white border border-transparent'
        }`}
      >
        <span className={`${isMobile ? 'font-medium' : 'text-xs font-medium'} flex items-center gap-2`}>
          <Sparkles size={16} className={selectedCategory === 'all' ? 'text-gold' : 'text-text-muted'} />
          All Products
        </span>
        <span className={`text-xs font-semibold ${
          selectedCategory === 'all' ? 'text-gold' : 'text-text-muted'
        }`}>
          {categoryCounts.all || 0}
        </span>
      </button>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`w-full text-left transition-all duration-200 flex justify-between items-center capitalize group rounded-xl ${
            isMobile ? 'px-4 py-3' : 'px-4 py-3'
          } ${
            selectedCategory === cat
              ? 'glass-strong text-white border border-gold-muted shadow-lg shadow-gold/10'
              : 'text-text-secondary hover:glass hover:text-white border border-transparent'
          }`}
        >
          <span className={`${isMobile ? 'font-medium' : 'text-xs font-medium'}`}>{cat}</span>
          <span className={`text-xs font-semibold ${
            selectedCategory === cat ? 'text-gold' : 'text-text-muted'
          }`}>
            {categoryCounts[cat] || 0}
          </span>
        </button>
      ))}
    </div>
  </div>
));

const Home = () => {
  const { products, categories, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const carouselRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  // Derived state for "Home View" vs "Filtered View"
  const isHomeView = searchQuery === '' && selectedCategory === 'all' && sortBy === 'default';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.title.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  const featuredProducts = useMemo(() => {
    return products.filter(p => p.featured);
  }, [products]);

  // Categories are provided by context and will automatically include new sections

  // Calculate category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: products.length };
    categories.forEach(cat => {
      counts[cat] = products.filter(p => p.category === cat).length;
    });
    return counts;
  }, [products, categories]);

  const handleCategorySelect = useCallback((category) => {
    setSelectedCategory(category);
    setIsMobileSidebarOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Auto-scroll for featured products - Smooth infinite loop
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel || isHovering) return;

    const scrollWidth = carousel.scrollWidth;
    const clientWidth = carousel.clientWidth;
    
    // Only auto-scroll if there's overflow
    if (scrollWidth <= clientWidth) return;

    let animationFrameId;
    const scrollSpeed = 0.6; // Pixels per frame (slow and smooth)

    const animate = () => {
      if (carousel && !isHovering) {
        // Increment scroll position
        carousel.scrollLeft += scrollSpeed;

        // Calculate the midpoint where we reset (halfway through duplicated content)
        const resetPoint = (scrollWidth - clientWidth) / 2;

        // Reset to start when reaching the midpoint for seamless loop
        if (carousel.scrollLeft >= resetPoint) {
          carousel.scrollLeft = 0;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [featuredProducts, isHovering]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
          <div className="absolute inset-0 rounded-full blur-xl bg-primary/20 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-400 mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="px-6 py-3 gradient-primary text-white rounded-xl hover:shadow-lg hover:shadow-primary/50 transition-all">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar - Left Navigation Rail */}
      <aside className="hidden lg:block w-64 glass border-r border-white/10 flex-shrink-0 sticky top-[72px] self-start h-[calc(100vh-72px)] overflow-y-auto z-40">
        <CategorySidebar
          selectedCategory={selectedCategory}
          categoryCounts={categoryCounts}
          categories={categories}
          onSelect={handleCategorySelect}
          isMobile={false}
        />
      </aside>

      {/* Mobile Sidebar Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative w-80 glass-strong h-full shadow-2xl transform transition-transform overflow-y-auto border-r border-white/20 z-50">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Filters</h2>
              <button 
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2 text-text-secondary hover:text-white rounded-full hover:bg-white/10 transition-all"
              >
                <X size={20} />
              </button>
            </div>
            <div className="flex-1">
              <CategorySidebar
                selectedCategory={selectedCategory}
                categoryCounts={categoryCounts}
                categories={categories}
                onSelect={handleCategorySelect}
                isMobile={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full min-w-0">
        {/* Filters & Search Header - sticky to top of page */}
        <div className="glass-strong border-b border-white/10 sticky top-[72px] z-50 backdrop-blur-xl bg-[rgba(10,10,15,0.98)] shadow-lg">
          <div className="px-8 py-5 flex flex-col md:flex-row gap-4 items-center justify-between">
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="lg:hidden w-full flex items-center justify-center gap-2 px-4 py-3 glass-card border border-white/20 rounded-xl text-white font-medium hover:border-primary/50 transition-all"
          >
            <Menu size={20} />
            <span>Filters</span>
          </button>

          {/* Search - Takes left priority */}
          <div className="relative w-full md:flex-1 lg:w-1/3">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3.5 glass-card border border-white/20 rounded-xl bg-transparent text-white placeholder-text-muted focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Sort - Right aligned */}
          <div className="relative w-full md:w-auto min-w-[220px]">
            <SlidersHorizontal className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={18} />
            <select
              className="w-full pl-12 pr-4 py-3.5 glass-card border border-white/20 rounded-xl appearance-none bg-transparent text-white cursor-pointer font-medium focus:outline-none focus:border-gold-muted focus:shadow-lg focus:shadow-gold/10 transition-all duration-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default" className="bg-gray-900">Sort by: Recommended</option>
              <option value="price-asc" className="bg-gray-900">Price: Low to High</option>
              <option value="price-desc" className="bg-gray-900">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

        {/* Main Content Area - natural page scroll */}
        <div className="px-8 py-10 pt-[100px]">
          {isHomeView ? (
              <div className="space-y-20">
                {/* Featured Carousel Section */}
                {featuredProducts.length > 0 && (
                  <section className="space-y-8">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <Star className="text-gold fill-gold" size={28} />
                        <h2 className="text-3xl font-bold text-white">Featured Products</h2>
                      </div>
                    </div>
                    
                    {/* Featured Products - Auto-scrolling Carousel */}
                    <div 
                      ref={carouselRef}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      className="relative overflow-x-auto rounded-2xl glass-card-premium border border-white/10 p-6 scrollbar-hide z-10"
                      style={{ scrollBehavior: 'auto' }}
                    >
                      <div className="flex gap-6 pb-2">
                        {/* Render featured products twice for infinite loop */}
                        {featuredProducts.map((product) => (
                          <div key={`featured-${product.id}`} className="flex-shrink-0 w-[280px]">
                            <ProductCard product={product} />
                          </div>
                        ))}
                        {/* Duplicate all items for seamless infinite scroll */}
                        {featuredProducts.map((product, idx) => (
                          <div key={`featured-duplicate-${product.id}-${idx}`} className="flex-shrink-0 w-[280px]">
                            <ProductCard product={product} />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Soft divider */}
                    <div className="section-divider my-12"></div>
                  </section>
                )}

                {/* Category Sections */}
                {categories.map(category => {
                  const categoryProducts = products.filter(p => p.category === category);
                  if (categoryProducts.length === 0) return null;

                  return (
                    <section key={category} className="space-y-7 scroll-fade-in">
                      <div className="flex justify-between items-end gap-4">
                        <h2 className="text-2xl font-bold text-white capitalize">
                          {category}
                          <span className="text-sm font-normal text-text-secondary ml-3">({categoryProducts.length})</span>
                        </h2>
                        <button 
                          onClick={() => handleCategorySelect(category)}
                          className="text-gold-muted hover:text-gold font-medium flex items-center gap-2 group transition-colors duration-200 text-sm whitespace-nowrap"
                        >
                          View All 
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
                        {categoryProducts.slice(0, 4).map(product => (
                          <ProductCard key={product.id} product={product} />
                        ))}
                      </div>
                      
                      {/* Soft divider between sections */}
                      <div className="section-divider mt-16"></div>
                    </section>
                  );
                })}
              </div>
            ) : (
              /* Filtered Grid View */
              <div className="scroll-fade-in">
                <div className="mb-8 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-white">
                    {filteredProducts.length} Result{filteredProducts.length !== 1 && 's'} Found
                  </h2>
                  {!isHomeView && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                        setSortBy('default');
                      }}
                      className="text-text-secondary hover:text-red-400 text-sm font-medium underline transition-colors duration-200"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
                
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-max">
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-24 glass-card-premium rounded-2xl border border-dashed border-white/20">
                    <p className="text-text-secondary text-lg mb-4">No products found matching your criteria.</p>
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                      className="px-6 py-3 gradient-primary text-white rounded-xl font-medium hover:shadow-lg hover:shadow-primary/50 transition-all btn-premium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}
        </div>
      </main>
    </div>
  );
};

export default Home;
