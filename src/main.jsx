import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './pages/index.jsx'
import './styles/index.css'
import Layout from "./components/Layout.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router}>
          <Layout />
      </RouterProvider>
  </React.StrictMode>,
)
