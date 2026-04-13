const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const fetchProducts = async (page = 1, limit = 6, search = '', sort = 'default') => {
  const params = new URLSearchParams({
    page,
    limit,
  })
  if (search) params.append('search', search)
  if (sort && sort !== 'default') params.append('sort', sort)

  const response = await fetch(`${API_URL}/products?${params}`)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Request failed with status ${response.status}`)
  }

  const json = await response.json()
  return json
}

