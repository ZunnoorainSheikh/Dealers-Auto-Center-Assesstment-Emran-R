const Loader = ({ message = 'Loading products...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div
        className="w-12 h-12 rounded-full border-4 border-indigo-100 border-t-indigo-600 animate-spin"
        role="status"
        aria-label="Loading"
      />
      <p className="text-gray-400 text-sm">{message}</p>
    </div>
  )
}

export default Loader
