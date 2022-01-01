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
import { HandleFunctions } from './contexts/handle'
import { About } from './pages/About'

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <HandleFunctions>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path = "/about" element={<About/>} />
            <Route path = "/login" element={<Login/>} /> 
            <Route path = "/admin" element={<Admin/>} />


          </Routes>
        </BrowserRouter>
      </HandleFunctions>
    </AuthProvider>
  </React.StrictMode>,
    document.getElementById('root')
)
