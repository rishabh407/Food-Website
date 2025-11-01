import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import DataProvider from './ContextCompUse/DataProvider.jsx'
import CartProvider from './ContextCompUse/CartProvider.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
  <CartProvider>
 <DataProvider>
 {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
</DataProvider>
</CartProvider>
  </StrictMode>
)
