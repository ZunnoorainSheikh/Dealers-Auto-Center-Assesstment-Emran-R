import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import FormPage from './pages/FormPage'

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8 max-w-7xl">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/form" element={<FormPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  )
}

export default App
