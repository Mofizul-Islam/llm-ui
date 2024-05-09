import React from 'react'
import Search from './components/Search'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Upload from "./components/Upload";
import Login from "./components/Login";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
