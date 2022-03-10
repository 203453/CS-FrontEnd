import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Login from "./Components/Login/Login"
import Register from "./Components/Register/Register"
import Navbar from "./Components/Navbar/Navbar"
import Profile from "./Components/Profile/Profile"
import Home from "./Components/Home/Home"

function App() {
  return (
    <BrowserRouter>

      <Navbar/>

      <Routes>
        <Route path='' element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
