import { createContext, useContext, useState, useEffect } from 'react';
import { products as productsData } from '../data/products';

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate loading for better UX
    const loadData = () => {
      try {
        setLoading(true);
        // Use local data
        setProducts(productsData);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(productsData.map(p => p.category))];
        setCategories(uniqueCategories);
        
        setError(null);
      } catch (err) {
        setError('Failed to load products.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const getProductById = (id) => {
    return products.find(p => p.id === parseInt(id));
  };

  return (
    <ProductContext.Provider value={{ products, categories, loading, error, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};
