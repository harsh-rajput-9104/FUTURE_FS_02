# ZWYNTRA : Mini E-Commerce Storefront

A fully functional, responsive, and production-ready Mini E-Commerce application with a premium futuristic UI, built with modern React practices and optimized for performance.

## 🎉 Live Demo Features

- ✨ **Premium Glassmorphism UI** with golden accents
- 📱 **Fully Responsive** - Mobile, Tablet, Desktop
- ⚡ **Optimized Performance** - React.memo, useCallback, useMemo
- 🎨 **Smooth Animations** - Premium micro-interactions
- 🛍️ **Complete E-Commerce Flow** - Browse, Cart, Checkout

## 🚀 Tech Stack

- **Frontend:** React.js 19 (Vite), Tailwind CSS 4, React Router DOM 7
- **State Management:** React Context API + LocalStorage
- **Notifications:** React Hot Toast
- **Icons:** Lucide React
- **Data:** Local products data (90 items across 9 categories)

## 🛠️ Features

### 1. Product Listing
- Responsive product grid (1-4 columns based on screen size)
- Search by product name/description
- Filter by 9 categories (Electronics, Fashion, Footwear, etc.)
- Sort by price (Low to High / High to Low)
- Featured products carousel with auto-scroll
- Category-based sections on homepage

### 2. Product Details
- Dynamic routing (`/product/:id`)
- Large product image with zoom effect
- Star ratings and review count
- Quantity selector
- "Add to Cart" with quantity

### 3. Shopping Cart
- Global cart state with Context API
- Persistent storage in LocalStorage
- Add/Remove items
- Update quantities with +/- controls
- Real-time total calculation (with tax)
- Order summary sidebar

### 4. Checkout Flow
- Shipping information form
- Form validation
- Mock order submission (2s delay)
- Order confirmation with unique Order ID
- Cart cleared after checkout

## 📂 Project Structure

```
FUTURE_FS_02/
├── client/                    # Frontend React Application
│   ├── src/
│   │   ├── components/          # Reusable UI components (Navbar, ProductCard)
│   │   ├── context/             # Global state (ProductContext, CartContext)
│   │   ├── data/                # Local products data
│   │   ├── pages/               # Route pages (Home, Cart, ProductDetails, Checkout)
│   │   ├── App.jsx              # Main App with routing
│   │   ├── index.css            # Global styles & Tailwind
│   │   └── main.jsx             # Entry point
│   ├── package.json
│   └── vite.config.js
├── server/                   # Backend Node/Express (minimal setup)
│   ├── index.js              # Express server
│   └── package.json
├── .gitignore
└── README.md
```

## ⚡ Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd FUTURE_FS_02
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **(Optional) Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

### Running the Application

**Start the Frontend (Recommended):**
```bash
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

*Note: The backend is optional for this demo as products are loaded from local data.*

### Building for Production

```bash
cd client
npm run build
npm run preview  # Preview production build locally
```

## 🎨 UI Design Highlights

- **Glassmorphism Effects** - Frosted glass aesthetic with backdrop blur
- **Golden Accents** - Premium muted gold highlights on featured items and active states
- **Smooth Transitions** - 200-250ms cubic-bezier animations
- **Hover Micro-Interactions** - 2-4px lifts, scale transforms, glow effects
- **Single Scrollbar** - Clean, stable page-level scrolling
- **Responsive Design** - Mobile-first with breakpoints for tablet and desktop

## 🚀 Performance Optimizations

- React.memo on all components to prevent unnecessary re-renders
- useCallback and useMemo hooks for expensive computations
- Optimized image loading with proper dimensions
- LocalStorage caching for cart persistence
- Debounced search and filter operations
- Clean component tree with minimal nesting

## 📝 Notes

- **Data Source:** Products are stored locally in `/client/src/data/products.js` (90 curated items)
- **Cart Persistence:** Cart data is saved in browser LocalStorage
- **Backend:** Minimal Express server included for future API extensions
- **Production Ready:** Optimized, clean code with no console logs or debug code
