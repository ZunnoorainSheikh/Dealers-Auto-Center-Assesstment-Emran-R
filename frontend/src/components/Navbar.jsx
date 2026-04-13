import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const { pathname } = useLocation()

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
      pathname === path
        ? 'bg-indigo-600 text-white shadow-sm'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-indigo-700 transition-colors">
              <span className="text-white font-bold text-sm select-none">PD</span>
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">ProductDash</span>
          </Link>

          {/* Nav links */}
          <div className="flex items-center gap-1">
            <Link to="/" className={linkClass('/')}>
              Dashboard
            </Link>
            <Link to="/form" className={linkClass('/form')}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
