import { useState, useMemo, useCallback, useEffect } from 'react'

const usePagination = (data, itemsPerPage = 6, resetKey) => {
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [resetKey])

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)

  const paginatedData = useMemo(
    () => data.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage),
    [data, safePage, itemsPerPage]
  )

  const goToPage = useCallback((page) => setCurrentPage(Math.min(Math.max(1, page), totalPages)), [totalPages])

  const nextPage = useCallback(() => setCurrentPage((p) => Math.min(p + 1, totalPages)), [totalPages])

  const prevPage = useCallback(() => setCurrentPage((p) => Math.max(p - 1, 1)), [])

  return {
    currentPage: safePage,
    totalPages,
    paginatedData,
    goToPage,
    nextPage,
    prevPage,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  }
}

export default usePagination
