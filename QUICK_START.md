# 🚀 Quick Start Deployment Guide

## Step-by-Step Deployment

### 1️⃣ Push to GitHub

```bash
# Navigate to your project folder
cd "C:\Vs Code Files\React\project\React Practise Projects\Project2 Food Website Full Stack Project But Not Completed Yet"

# Initialize git (if not done)
git init

# Add all files
git add .

# Commit
git commit -m "Food website ready for deployment"

# Create repository on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 2️⃣ Deploy Backend to Render

1. Go to [render.com](https://render.com) → Sign up
2. Click **"New"** → **"Web Service"**
3. Connect GitHub → Select your repo
4. Configure:
   - **Name:** `food-api`
   - **Root Directory:** `ApiFolder/FoodAPi`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
5. Click **"Create Web Service"**
6. **Wait for deployment** (5-10 min)
7. **Copy the URL** (e.g., `https://food-api.onrender.com`)

### 3️⃣ Deploy Frontend to Vercel

1. Go to [vercel.com](https://vercel.com) → Sign up
2. Click **"Add New Project"**
3. Import your GitHub repo
4. Configure:
   - **Root Directory:** `my-app`
   - **Framework:** Vite (auto-detected)
5. **Add Environment Variable:**
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** Your Render backend URL (from step 2)
6. Click **"Deploy"**
7. **Done!** Your site is live! 🎉

---

## 🔑 Important Notes

- **Backend URL:** Use the URL from Render (step 2) in Vercel environment variables
- **Free Tier:** Render free tier sleeps after 15 min (first request may be slow)
- **Auto-Deploy:** Both platforms auto-deploy on git push

---

## ✅ That's It!

Your website will be live at: `https://your-project.vercel.app`

For detailed instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

