import Navbar from "./Components/Navbar"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import Home from "./Components/Home"
import Profile from "./Components/Profile"
import { Provider } from "react-redux"
import { store } from "./utils/appStore"
import Feed from "./Components/Feed"

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="/" element={<Feed />} />
              <Route path="login" element={<Login />} />
              <Route path="profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider >


    </>
  )
}

export default App
