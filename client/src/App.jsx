import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Cookies from "js-cookie"

// pages
import LandingPage from "./Components/LandingPage"
import RegisterPage from "./Components/Register"
import LoginPage from "./Components/Login"
import DashboardLayout from "./Components/DashboardLayout"
import ProtectedRoutes from "./Components/ProtectedRoutes"
import PublicProfilePage from "./Components/PublicProfilePage"

// theme context
import { ThemeProvider } from "./Components/ThemeContext"

const App = () => {
  const jwtUserToken = Cookies.get("token");
  const isUserLoggedIn = jwtUserToken ? true : false;  
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/register' element={<RegisterPage/>} />
          <Route path="/user/public/:userLink" element={<PublicProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          {/* <Route path="/dashboard" element={<DashboardLayout />} /> */}
          <Route path="/dashboard" exact element={<ProtectedRoutes Component={DashboardLayout} isUserLoggedIn={isUserLoggedIn} />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}

export default App
