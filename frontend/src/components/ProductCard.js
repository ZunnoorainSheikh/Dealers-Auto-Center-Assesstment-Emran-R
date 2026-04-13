const ProductCard = ({ product }) => {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col">
      <div className="aspect-video overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.currentTarget.src = 'https://placehold.co/400x225/e2e8f0/94a3b8?text=No+Image'
            e.currentTarget.onerror = null
          }}
        />
      </div>

      <div className="p-4 flex flex-col flex-1">
        <h3
          className="font-semibold text-gray-800 text-sm leading-snug mb-3 flex-1 overflow-hidden"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
          title={product.title}
        >
          {product.title}
        </h3>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-indigo-600 font-bold text-xl">${product.price.toFixed(2)}</span>
          <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full font-medium">
            In Stock
          </span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
