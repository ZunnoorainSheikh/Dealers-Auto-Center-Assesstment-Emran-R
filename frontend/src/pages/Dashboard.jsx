import { useState, useEffect, useMemo } from 'react'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import useDebounce from '../hooks/useDebounce'
import usePagination from '../hooks/usePagination'
import { fetchProducts } from '../services/api'

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'name-asc', label: 'Name: A → Z' },
  { value: 'name-desc', label: 'Name: Z → A' },
]

const ITEMS_PER_PAGE = 6

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('default')

  const debouncedSearch = useDebounce(search, 300)

  const loadProducts = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchProducts()
      setProducts(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadProducts()
  }, [])

  // Filter + sort — recomputed only when deps change
  const filtered = useMemo(() => {
    const query = debouncedSearch.toLowerCase()
    const result = products.filter((p) =>
      p.title.toLowerCase().includes(query)
    )

    switch (sort) {
      case 'price-asc':
        return [...result].sort((a, b) => a.price - b.price)
      case 'price-desc':
        return [...result].sort((a, b) => b.price - a.price)
      case 'name-asc':
        return [...result].sort((a, b) => a.title.localeCompare(b.title))
      case 'name-desc':
        return [...result].sort((a, b) => b.title.localeCompare(a.title))
      default:
        return result
    }
  }, [products, debouncedSearch, sort])

  // Pass a reset key so page resets to 1 on filter/sort change
  const resetKey = `${debouncedSearch}::${sort}`

  const {
    currentPage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    hasNext,
    hasPrev,
  } = usePagination(filtered, ITEMS_PER_PAGE, resetKey)

  // Render page number buttons with ellipsis for large page counts
  const pageButtons = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    const pages = new Set([1, totalPages, currentPage])
    for (let d = -2; d <= 2; d++) {
      const p = currentPage + d
      if (p >= 1 && p <= totalPages) pages.add(p)
    }
    return [...pages].sort((a, b) => a - b)
  }, [totalPages, currentPage])

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Dashboard</h1>
        <p className="text-gray-500 mt-1">Browse and explore our full product catalog.</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
              bg-white placeholder-gray-400"
          />
        </div>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm bg-white
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
            text-gray-700 min-w-[180px]"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* States */}
      {loading && <Loader />}
      {!loading && error && <ErrorMessage message={error} onRetry={loadProducts} />}

      {!loading && !error && (
        <>
          {paginatedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
              <div className="text-5xl">🔍</div>
              <p className="text-gray-500 text-lg">
                No products found
                {debouncedSearch && (
                  <span>
                    {' '}for &ldquo;<span className="font-medium text-gray-700">{debouncedSearch}</span>&rdquo;
                  </span>
                )}
              </p>
              {debouncedSearch && (
                <button
                  onClick={() => setSearch('')}
                  className="text-indigo-600 text-sm hover:underline"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : (
            <>
              {/* Results summary */}
              <p className="text-sm text-gray-500 mb-4">
                Showing{' '}
                <span className="font-medium text-gray-700">
                  {(currentPage - 1) * ITEMS_PER_PAGE + 1}–
                  {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
                </span>{' '}
                of <span className="font-medium text-gray-700">{filtered.length}</span> products
              </p>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedData.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
                  <button
                    onClick={prevPage}
                    disabled={!hasPrev}
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg
                      disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50
                      transition-colors"
                  >
                    ← Prev
                  </button>

                  {pageButtons.map((page, idx) => {
                    const prevBtn = pageButtons[idx - 1]
                    const showEllipsis = prevBtn && page - prevBtn > 1
                    return (
                      <span key={page} className="flex items-center gap-1.5">
                        {showEllipsis && (
                          <span className="px-2 text-gray-400 select-none">…</span>
                        )}
                        <button
                          onClick={() => goToPage(page)}
                          className={`w-9 h-9 text-sm font-medium rounded-lg transition-colors ${
                            page === currentPage
                              ? 'bg-indigo-600 text-white shadow-sm'
                              : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                          }`}
                        >
                          {page}
                        </button>
                      </span>
                    )
                  })}

                  <button
                    onClick={nextPage}
                    disabled={!hasNext}
                    className="px-4 py-2 text-sm font-medium border border-gray-300 rounded-lg
                      disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50
                      transition-colors"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}

export default Dashboard
