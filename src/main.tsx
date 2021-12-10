import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import ReactDOM from 'react-dom'
import './styles/global.scss'
import App from './App'
import { AdminExample } from './pages/Admin'
import { Login } from './pages/Login';

ReactDOM.render(
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>} />
        <Route path = "/login" element={<Login/>} /> {/* This routes is a example*/}
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
)
