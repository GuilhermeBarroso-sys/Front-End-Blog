import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import ReactDOM from 'react-dom'
import './styles/global.scss'
import App from './App'
import { Admin } from './pages/Admin'
import { Login } from './pages/Login';
import { AuthProvider } from './contexts/auth'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App/>} />
          <Route path = "/login" element={<Login/>} /> {/* This routes is a example*/}
          <Route path = "/admin" element={<Admin/>} /> {/* This routes is a example*/}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
    document.getElementById('root')
)
