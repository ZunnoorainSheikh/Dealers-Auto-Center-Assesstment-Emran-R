# Frontend Railway Deployment Guide

## ✅ Changes Made

1. **Converted from Create React App to Vite** 
   - Updated `package.json` with Vite dependencies
   - Updated `vite.config.js` with proper configuration
   - Created `index.html` in root (Vite requirement)

2. **Fixed Environment Variables**
   - Updated `src/services/api.js` to use `import.meta.env.VITE_API_URL` (Vite syntax)
   - Created `.env.production` for Railway configuration
   - Created `.env.example` for reference

3. **Created Express Server**
   - `server.js` serves the built Vite app as static files
   - Handles SPA routing (all routes serve index.html)
   - Supports PORT environment variable for Railway

4. **Created Deployment Configuration**
   - `Procfile` for Railway process management
   - Proper build and start scripts

## 🚀 Steps to Deploy on Railway

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Fix frontend for Railway deployment - Vite migration"
git push origin main
```

### Step 2: Build Locally (Test)
```bash
cd frontend
npm install
npm run build
npm start
```
Then visit `http://localhost:5173`

### Step 3: Deploy on Railway
1. Go to [railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. **IMPORTANT**: Set root directory to `/frontend` in Railway settings
5. Add Environment Variables:
   - `VITE_API_URL`: Your backend Railway URL (e.g., `https://your-backend.up.railway.app/api`)
   - `NODE_ENV`: `production`

### Step 4: Configure Backend API URL
In Railway Dashboard:
- Go to Frontend service → Variables
- Add: `VITE_API_URL=https://your-backend-railway-url.up.railway.app/api`

## 📋 Troubleshooting

**If code still crashes:**

1. Check Railway logs:
   - Railway Dashboard → Your App → Logs
   - Look for specific error messages

2. Common issues:
   - Missing `VITE_API_URL` environment variable
   - Backend API not accessible (CORS issues)
   - Node version incompatibility

3. Check dist folder was built:
   - Ensure build runs successfully: `npm run build`
   - dist/ folder should be created locally

## 🔧 Local Development

```bash
# Install dependencies
npm install

# Start dev server (Vite)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Start production server
npm start
```

## 📝 Environment Variables

### Development (`.env`)
```
VITE_API_URL=http://localhost:5000/api
```

### Production (Railway Dashboard)
```
VITE_API_URL=https://your-backend-api.up.railway.app/api
NODE_ENV=production
```

## 🔗 Important Notes
- Make sure backend is also deployed on Railway first
- Copy the backend Railway URL for `VITE_API_URL`
- Check CORS settings in backend for frontend domain
