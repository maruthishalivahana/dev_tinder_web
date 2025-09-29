import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Home from "./Components/Home"
import Profile from "./Components/Profile"
import Editprofile from "./Components/Editprofile"
import { Provider } from "react-redux"
import { store } from "./utils/appStore"
import Feed from "./Components/Feed"
import { ToastContainer } from "react-toastify"
import Connections from "./Components/Connections"

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Feed />} />
              <Route path="profile" element={<Profile />} />
              <Route path="editprofile" element={<Editprofile />} />
              <Route path="connections" element={<Connections />} />
            </Route>
            <Route path="login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider >


    </>
  )
}

export default App
