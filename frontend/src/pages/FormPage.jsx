import { useState } from 'react'
import { useToast } from '../context/ToastContext'

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  password: '',
}

const validate = (values) => {
  const errors = {}

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.'
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  if (!values.email.trim()) {
    errors.email = 'Email address is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.'
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required.'
  } else if (!/^\+?[\d\s\-()\\.]{7,20}$/.test(values.phone)) {
    errors.phone = 'Enter a valid phone number.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.'
  }

  return errors
}

const FieldError = ({ message }) =>
  message ? (
    <p role="alert" className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clipRule="evenodd"
        />
      </svg>
      {message}
    </p>
  ) : null

const FormPage = () => {
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const { addToast } = useToast()

  const getFieldClass = (name) =>
    `w-full px-4 py-2.5 border rounded-lg text-sm transition-colors duration-200
    focus:outline-none focus:ring-2 ${
      errors[name] && touched[name]
        ? 'border-red-400 focus:ring-red-400 bg-red-50'
        : 'border-gray-300 focus:ring-indigo-500 focus:border-transparent bg-white'
    }`

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...form, [name]: value }
    setForm(next)
    // Live validation on touched fields
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(next)[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validate(form)[name] }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Touch all fields to reveal errors
    const allTouched = Object.keys(INITIAL_FORM).reduce(
      (acc, k) => ({ ...acc, [k]: true }),
      {}
    )
    setTouched(allTouched)

    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true)
      addToast('Form submitted successfully! 🎉', 'success')
    } else {
      addToast('Please fix the highlighted errors.', 'error')
    }
  }

  const handleReset = () => {
    setForm(INITIAL_FORM)
    setErrors({})
    setTouched({})
    setSubmitted(false)
    setShowPassword(false)
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-200">
            <svg
              className="w-8 h-8 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mb-1">All Done!</h2>
          <p className="text-gray-500 text-sm mb-6">Your form was submitted successfully.</p>

          {/* Summary */}
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-left text-sm space-y-2.5 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Name</span>
              <span className="text-gray-800">{form.fullName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Email</span>
              <span className="text-gray-800 break-all">{form.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500 font-medium">Phone</span>
              <span className="text-gray-800">{form.phone}</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg
              hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2
              focus:ring-indigo-500 focus:ring-offset-2"
          >
            Submit Another Response
          </button>
        </div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-md mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Form</h1>
        <p className="text-gray-500 mt-1">Fill in the details below. All fields are required.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} noValidate className="space-y-5">

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Jane Doe"
              autoComplete="name"
              className={getFieldClass('fullName')}
            />
            <FieldError message={touched.fullName && errors.fullName} />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="jane@example.com"
              autoComplete="email"
              className={getFieldClass('email')}
            />
            <FieldError message={touched.email && errors.email} />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+1 (555) 000-0000"
              autoComplete="tel"
              className={getFieldClass('phone')}
            />
            <FieldError message={touched.phone && errors.phone} />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Min. 6 characters"
                autoComplete="new-password"
                className={`${getFieldClass('password')} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400
                  hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0
                        011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88
                        9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478
                        0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274
                        4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
            <FieldError message={touched.password && errors.password} />
            {/* Strength hint */}
            {form.password && !errors.password && (
              <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Password looks good!
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg
              hover:bg-indigo-700 active:bg-indigo-800 transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              shadow-sm mt-2"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  )
}

export default FormPage
