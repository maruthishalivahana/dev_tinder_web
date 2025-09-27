import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Home from "./Components/Home"
function App() {
  return (
    <>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Navbar />

    </>
  )
}

export default App
