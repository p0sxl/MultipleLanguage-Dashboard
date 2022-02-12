import { useState } from 'react'
import logo from './logo.svg'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Index from './views/Index';
import Login from './views/Login'
import Users from './views/Users';
import Dashboard from './layouts/Dashboard'
import Projects from './views/Projects';
import Translations from './views/Translations';

const app =  () => {

  return (
    <>
     <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />}/>
      <Route path="/" element={<Dashboard element={<Index/>} />}/>
      <Route path="/users" element={<Dashboard element={<Users/>} />}/>
      <Route path="/projects" element={<Dashboard element={<Projects/>} />}/>
      <Route path="/translations" element={<Dashboard element={<Translations/>} />}/>

    </Routes>
  </BrowserRouter>
    </>
  )
}

export default app
