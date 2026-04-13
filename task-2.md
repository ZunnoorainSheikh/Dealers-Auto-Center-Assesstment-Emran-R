# Task 2: Form + Validation (User Input Flow)

## Overview
Comprehensive form with real-time validation, error messaging, and success screen.

## Form Fields
1. **Full Name**: Min 2 characters required
2. **Email**: Valid email format required
3. **Phone**: Valid phone format (7-20 chars, supports +, spaces, -, parentheses)
4. **Password**: Minimum 6 characters required

## Validation Features

### ✅ Validation Rules
- **File**: [frontend/src/pages/FormPage.jsx](FormPage.jsx) - `validate()` function
- All fields required
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Phone regex: `/^\+?[\d\s\-()\\.]{7,20}$/`
- Real-time validation on blur and while typing (if field touched)

### ✅ Error Display
- Inline error messages under each field
- Red border on invalid fields
- Red background highlight
- Error icon with message
- Only shown after field is touched (better UX)

### ✅ Form Behavior
- Live validation: Updates as user types (after touching field)
- Error visibility: Triggered on blur or submit
- Submit: Validates all fields first
  - **Valid**: Success message + success screen
  - **Invalid**: Error toast + errors remain visible

### ✅ UI Features
- Clean form layout with labels
- Password toggle (show/hide button)
- Success screen shows submitted data summary
- Reset button to clear form
- Responsive on mobile

### 📍 File Locations
- Main form: `frontend/src/pages/FormPage.jsx`
- Toast notifications: `frontend/src/context/ToastContext.jsx`
- Styling: Tailwind CSS (inline in component)

## Extra Features
- Password visibility toggle
- Field-level error tracking
- Touch state tracking (only show errors after interaction)
- Success screen with data summary
- Toast notifications for feedback
- Smooth transitions and hover effects
