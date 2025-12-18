# 🚀 Deployment Guide

This guide will help you deploy your Food Website project to GitHub and Vercel.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier available)
- Node.js installed locally
- Git installed

---

## 📦 Step 1: Prepare Your Project

### 1.1 Navigate to your project folder
```bash
cd "my-app"
```

### 1.2 Initialize Git (if not already done)
```bash.
git init
```

### 1.3 Create .env file for local development
Create a `.env` file in the `my-app` folder:
```
VITE_API_BASE_URL=http://localhost:5000
```

**Note:** This file is already in `.gitignore` and won't be committed to GitHub.

---

## 🐙 Step 2: Push to GitHub

### 2.1 Create a new repository on GitHub
1. Go to [GitHub](https://github.com)
2. Click the "+" icon → "New repository"
3. Name it (e.g., "food-website")
4. **Don't** initialize with README, .gitignore, or license
5. Click "Create repository"

### 2.2 Add files and commit
```bash
# Add all files
git add .

# Commit
git commit -m "Initial commit: Food website with cart and wishlist"

# Add remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## ☁️ Step 3: Deploy Backend (API Server)

Your backend needs to be deployed separately. Here are the best options:

### Option A: Render (Recommended - Free tier available)

1. Go to [Render](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Select the `ApiFolder/FoodAPi` folder
5. Configure:
   - **Name:** food-api (or any name)
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Root Directory:** `ApiFolder/FoodAPi`
6. Add environment variable:
   - **Key:** `PORT`
   - **Value:** `5000` (or let Render assign)
7. Click "Create Web Service"
8. **Copy the deployed URL** (e.g., `https://food-api.onrender.com`)

### Option B: Railway

1. Go to [Railway](https://railway.app) and sign up
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Set root directory to `ApiFolder/FoodAPi`
5. Railway will auto-detect and deploy
6. **Copy the deployed URL**

### Option C: Heroku (if you have account)

1. Install Heroku CLI
2. Navigate to backend folder:
   ```bash
   cd ApiFolder/FoodAPi
   ```
3. Create Heroku app:
   ```bash
   heroku create your-app-name
   ```
4. Deploy:
   ```bash
   git subtree push --prefix ApiFolder/FoodAPi heroku main
   ```

---

## ⚡ Step 4: Deploy Frontend to Vercel

### 4.1 Connect to Vercel

1. Go to [Vercel](https://vercel.com) and sign up/login
2. Click "Add New Project"
3. Import your GitHub repository
4. Select the repository you just pushed

### 4.2 Configure Project

1. **Framework Preset:** Vite (auto-detected)
2. **Root Directory:** `my-app`
3. **Build Command:** `npm run build` (auto-filled)
4. **Output Directory:** `dist` (auto-filled)
5. **Install Command:** `npm install` (auto-filled)

### 4.3 Add Environment Variable

Click "Environment Variables" and add:
- **Key:** `VITE_API_BASE_URL`
- **Value:** Your deployed backend URL (e.g., `https://food-api.onrender.com`)

**Important:** Make sure to add this for:
- ✅ Production
- ✅ Preview
- ✅ Development

### 4.4 Deploy

Click "Deploy" and wait for the build to complete!

---

## 🔧 Step 5: Update Image URLs (If Needed)

If your backend serves images from a different domain, you may need to update image URLs in your code. The current setup uses:
```javascript
src={`http://localhost:5000${item.image_url}`}
```

This should automatically work if your backend URL is set correctly in environment variables. However, if images don't load, check:

1. Backend CORS settings allow your Vercel domain
2. Image paths are correct
3. Backend serves static files properly

---

## 📝 Step 6: Update Backend CORS (Important!)

Update your backend `server.js` to allow requests from your Vercel domain:

```javascript
// In ApiFolder/FoodAPi/server.js
app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'https://your-app.vercel.app', // Your Vercel URL
    'https://*.vercel.app' // All Vercel previews
  ],
  credentials: true
}));
```

---

## ✅ Step 7: Verify Deployment

1. Visit your Vercel URL
2. Test all features:
   - ✅ Browse menu
   - ✅ Add to cart
   - ✅ Add to wishlist
   - ✅ Checkout process
   - ✅ Images loading

---

## 🔄 Updating Your Deployment

### To update frontend:
```bash
git add .
git commit -m "Your update message"
git push
```
Vercel will automatically redeploy!

### To update backend:
1. Make changes to `ApiFolder/FoodAPi/server.js`
2. Commit and push to GitHub
3. Your backend hosting service will auto-deploy (or trigger manual deploy)

---

## 🐛 Troubleshooting

### Images not loading?
- Check backend CORS settings
- Verify image paths in backend
- Check browser console for errors

### API calls failing?
- Verify `VITE_API_BASE_URL` is set correctly in Vercel
- Check backend is running and accessible
- Verify CORS allows your Vercel domain

### Build errors?
- Check Node.js version compatibility
- Review build logs in Vercel dashboard
- Ensure all dependencies are in package.json

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Render Documentation](https://render.com/docs)
- [GitHub Documentation](https://docs.github.com)

---

## 🎉 You're Done!

Your food website is now live! Share your Vercel URL with the world! 🚀

