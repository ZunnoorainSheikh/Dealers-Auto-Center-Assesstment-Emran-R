const ErrorMessage = ({ message = 'Something went wrong.', onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center border border-red-100">
        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>

      <div className="text-center max-w-sm">
        <h3 className="text-gray-800 font-semibold text-lg">Oops! Something went wrong</h3>
        <p className="text-gray-500 text-sm mt-1">{message}</p>
      </div>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Try Again
        </button>
      )}
    </div>
  )
}

export default ErrorMessage
