const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api'

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`)

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Request failed with status ${response.status}`)
  }

  const json = await response.json()
  return json.data
}

