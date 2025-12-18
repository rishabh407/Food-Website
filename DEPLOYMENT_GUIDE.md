# 🚀 Complete Deployment Guide

This guide will walk you through deploying your Food Website project to GitHub and Vercel.

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Step 1: Prepare Your Code](#step-1-prepare-your-code)
3. [Step 2: Push to GitHub](#step-2-push-to-github)
4. [Step 3: Deploy Backend](#step-3-deploy-backend)
5. [Step 4: Deploy Frontend to Vercel](#step-4-deploy-frontend-to-vercel)
6. [Step 5: Configure Environment Variables](#step-5-configure-environment-variables)
7. [Troubleshooting](#troubleshooting)

---

## ✅ Prerequisites

- [ ] GitHub account
- [ ] Vercel account (sign up at [vercel.com](https://vercel.com))
- [ ] Render account (for backend - sign up at [render.com](https://render.com))
- [ ] Git installed on your computer
- [ ] Node.js installed

---

## 📦 Step 1: Prepare Your Code

### 1.1 Create .env file for local development

In the `my-app` folder, create a `.env` file:

```env
VITE_API_BASE_URL=http://localhost:5000
```

**Note:** This file is already in `.gitignore` and won't be committed.

### 1.2 Test your project locally

Make sure everything works:
```bash
# Terminal 1 - Start backend
cd ApiFolder/FoodAPi
node server.js

# Terminal 2 - Start frontend
cd my-app
npm run dev
```

---

## 🐙 Step 2: Push to GitHub

### 2.1 Initialize Git (if not done)

```bash
# Navigate to project root
cd "C:\Vs Code Files\React\project\React Practise Projects\Project2 Food Website Full Stack Project But Not Completed Yet"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Food website with cart and wishlist features"
```

### 2.2 Create GitHub Repository

1. Go to [GitHub.com](https://github.com)
2. Click the **"+"** icon → **"New repository"**
3. Repository name: `food-website` (or any name you like)
4. Description: "Full stack food ordering website"
5. Choose **Public** or **Private**
6. **DO NOT** check "Initialize with README"
7. Click **"Create repository"**

### 2.3 Push to GitHub

```bash
# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/food-website.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main
```

---

## ☁️ Step 3: Deploy Backend (API Server)

Your backend needs to be deployed separately. **Render** is recommended (free tier available).

### Option A: Deploy to Render (Recommended)

1. **Go to Render**
   - Visit [render.com](https://render.com)
   - Sign up/login with GitHub

2. **Create New Web Service**
   - Click **"New"** → **"Web Service"**
   - Connect your GitHub account if not already connected
   - Select your repository: `food-website`

3. **Configure Service**
   - **Name:** `food-api` (or any name)
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `ApiFolder/FoodAPi`
   - **Build Command:** `npm install` (or leave empty)
   - **Start Command:** `node server.js`

4. **Environment Variables** (Optional)
   - Click **"Advanced"**
   - Add environment variable:
     - **Key:** `PORT`
     - **Value:** `5000` (Render will override this, but good to have)

5. **Deploy**
   - Click **"Create Web Service"**
   - Wait for deployment (5-10 minutes)
   - **Copy the URL** (e.g., `https://food-api.onrender.com`)

6. **Important Notes:**
   - Free tier services sleep after 15 minutes of inactivity
   - First request after sleep takes ~30 seconds
   - Consider upgrading for production

### Option B: Deploy to Railway

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Click **"Add Service"** → **"GitHub Repo"**
6. In settings, set **Root Directory** to `ApiFolder/FoodAPi`
7. Railway auto-detects and deploys
8. Copy the deployed URL

---

## ⚡ Step 4: Deploy Frontend to Vercel

### 4.1 Connect to Vercel

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign up/login with GitHub

2. **Import Project**
   - Click **"Add New..."** → **"Project"**
   - Import your GitHub repository: `food-website`
   - Click **"Import"**

### 4.2 Configure Project Settings

1. **Framework Preset:** Vite (auto-detected)
2. **Root Directory:** Click **"Edit"** and set to `my-app`
3. **Build Command:** `npm run build` (auto-filled)
4. **Output Directory:** `dist` (auto-filled)
5. **Install Command:** `npm install` (auto-filled)

### 4.3 Add Environment Variable

**Before deploying**, click **"Environment Variables"**:

- **Key:** `VITE_API_BASE_URL`
- **Value:** Your backend URL (e.g., `https://food-api.onrender.com`)
- **Environments:** Check all (Production, Preview, Development)

### 4.4 Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Your site will be live at: `https://your-project.vercel.app`

---

## 🔧 Step 5: Configure Environment Variables

### For Vercel (Frontend):

1. Go to your project dashboard
2. Click **"Settings"** → **"Environment Variables"**
3. Add:
   ```
   VITE_API_BASE_URL = https://your-backend-url.onrender.com
   ```
4. Redeploy after adding variables

### For Render (Backend):

1. Go to your service dashboard
2. Click **"Environment"** tab
3. Add if needed:
   ```
   PORT = 5000
   NODE_ENV = production
   ```

---

## 🔄 Updating Your Deployment

### Update Frontend:

```bash
# Make your changes
git add .
git commit -m "Your update message"
git push
```

Vercel automatically redeploys on push!

### Update Backend:

```bash
# Make your changes
git add .
git commit -m "Backend update"
git push
```

Render/Railway automatically redeploys on push!

---

## 🐛 Troubleshooting

### ❌ Images not loading?

**Problem:** Images show broken links

**Solution:**
1. Check backend is running and accessible
2. Verify image paths in backend
3. Check CORS settings in backend
4. Ensure backend URL is correct in Vercel environment variables

### ❌ API calls failing?

**Problem:** Network errors or CORS errors

**Solution:**
1. Verify `VITE_API_BASE_URL` is set correctly in Vercel
2. Check backend CORS allows your Vercel domain
3. Test backend URL directly in browser
4. Check browser console for specific errors

### ❌ Build fails on Vercel?

**Problem:** Build errors during deployment

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Verify Node.js version compatibility
4. Check for TypeScript errors (if using TS)

### ❌ Backend not responding?

**Problem:** Backend returns 404 or timeout

**Solution:**
1. Check Render/Railway logs
2. Verify `server.js` is the entry point
3. Check PORT environment variable
4. Ensure all dependencies are installed

---

## 📝 Quick Checklist

Before deploying, make sure:

- [ ] All hardcoded `localhost:5000` URLs replaced with environment variable
- [ ] `.env` file created (not committed to Git)
- [ ] Backend tested locally
- [ ] Frontend tested locally
- [ ] Code pushed to GitHub
- [ ] Backend deployed and URL copied
- [ ] Frontend environment variable set in Vercel
- [ ] CORS configured in backend

---

## 🎉 Success!

Once deployed, you'll have:

- ✅ Frontend: `https://your-project.vercel.app`
- ✅ Backend: `https://your-backend.onrender.com`
- ✅ Fully functional food ordering website!

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [GitHub Documentation](https://docs.github.com)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)

---

**Need help?** Check the error logs in your deployment platform's dashboard!

