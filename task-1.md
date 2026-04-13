# Task 1: API-Based Listing Page (Mini Dashboard)

## Overview
Product listing page with API integration, search, sorting, pagination, and error handling.

## Key Features Implemented

### ✅ Data Fetching
- **File**: [frontend/src/pages/Dashboard.jsx](Dashboard.jsx) + [frontend/src/services/api.js](api.js)
- Fetches products from backend API with pagination support
- Uses `fetchProducts()` service function

### ✅ Search Filter
- **Debounced search**: 300ms delay to reduce API calls
- Uses `useDebounce` hook
- Real-time filtering by product name

### ✅ Sorting
- **Options**: Default, Price (Low→High), Price (High→Low), Name (A→Z), Name (Z→A)
- Dropdown selector in UI
- Immediate re-fetch on sort change

### ✅ Pagination
- **Smart page navigation**: Shows first, last, current ±2, and ellipsis
- Previous/Next buttons
- Page count display (e.g., "Page 1 of 5")
- Default 6 items per page

### ✅ Loading & Error States
- Loading spinner displayed while fetching
- Error message displayed if API fails
- Graceful fallback for missing product images

### ✅ Component Structure
- **ProductCard**: Reusable card component showing title, image, price
- **Dashboard**: Main container with controls and grid layout
- Responsive grid (auto-responsive)

### 📍 File Locations
- Main page: `frontend/src/pages/Dashboard.jsx`
- Card component: `frontend/src/components/ProductCard.jsx`
- API service: `frontend/src/services/api.js`
- Hook: `frontend/src/hooks/useDebounce.js`

## Extra Features
- Lazy loading for images
- Tailwind CSS responsive design
- Mobile-friendly controls
- Live search with debounce optimization
