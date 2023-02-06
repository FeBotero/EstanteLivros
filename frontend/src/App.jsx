

import Modal from "react-modal"

import { Routes, Route } from "react-router-dom";

import "./App.css"

import {Home}from "./pages/Home"
import {Admin} from "./pages/Admin"


Modal.setAppElement("#root")

export function App() {
  

  return (
    <div className="App">
      <Routes>
        <Route index element={<Admin/>}/>
        <Route path="/edit" element={<Home/>}/>
        
      </Routes>
    </div>
  )
}

