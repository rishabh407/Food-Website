# 🍔 Food Website - Full Stack Project

A modern, responsive food ordering website built with React, Redux, and Vite.

## ✨ Features

- 🍕 **Menu Browsing** - Browse delicious dishes by category
- 🛒 **Shopping Cart** - Add items with different sizes to cart
- ❤️ **Wishlist** - Save your favorite items for later
- 📱 **Responsive Design** - Works perfectly on all devices
- 🎨 **Modern UI** - Beautiful animations and gradients
- ⚡ **Fast Performance** - Optimized with Vite
- 🔍 **Search Functionality** - Find dishes quickly
- 💳 **Checkout Process** - Complete order placement

## 🛠️ Tech Stack

- **Frontend:**
  - React 19
  - Redux Toolkit (State Management)
  - React Router (Routing)
  - Framer Motion (Animations)
  - Tailwind CSS (Styling)
  - Vite (Build Tool)
  - Axios (API Calls)

- **Backend:**
  - Node.js
  - Express.js
  - CORS enabled

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Install frontend dependencies**
   ```bash
   cd my-app
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../ApiFolder/FoodAPi
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in `my-app` folder:
   ```
   VITE_API_BASE_URL=http://localhost:5000
   ```

5. **Start the backend server**
   ```bash
   cd ApiFolder/FoodAPi
   node server.js
   ```
   Backend will run on `http://localhost:5000`

6. **Start the frontend**
   ```bash
   cd my-app
   npm run dev
   ```
   Frontend will run on `http://localhost:5173`

## 📁 Project Structure

```
├── my-app/                 # Frontend React application
│   ├── src/
│   │   ├── api/           # API configuration
│   │   ├── Components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # Redux store and slices
│   │   └── hooks/         # Custom hooks
│   └── public/            # Static assets
│
└── ApiFolder/
    └── FoodAPi/           # Backend Express server
        ├── server.js      # Main server file
        └── Images/         # Food images
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel:

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variable: `VITE_API_BASE_URL`
4. Deploy!

## 📝 Available Scripts

### Frontend (my-app)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Backend (ApiFolder/FoodAPi)
- `node server.js` - Start backend server

## 🎯 Key Features Explained

### Cart System
- Add items with different sizes as separate cart items
- Quantity management
- Persistent cart (localStorage)
- Real-time total calculation

### Wishlist System
- Save favorite items
- Quick add to cart from wishlist
- Persistent wishlist (localStorage)

### Responsive Design
- Mobile-first approach
- Works on all screen sizes
- Touch-friendly interactions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Your Name

---

**Made with ❤️ using React and Vite**
