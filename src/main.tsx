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

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <HandleFunctions>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App/>} />
            <Route path = "/login" element={<Login/>} /> {/* This routes is a example*/}
            <Route path = "/admin" element={<Admin/>} /> {/* This routes is a example*/}

          </Routes>
        </BrowserRouter>
      </HandleFunctions>
    </AuthProvider>
  </React.StrictMode>,
    document.getElementById('root')
)
