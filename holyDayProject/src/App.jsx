import { useState } from 'react'
import './App.css'
import LoginForm from './components/LoginForm.jsx'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import ProfilePage from "./components/ProfilePage.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Logout from "./components/Logout.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <AuthProvider>
        <Navbar/>
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/" element={<Home />} />
            <Route element={<PrivateRoute />}>
                <Route path="/profile/:username" element={<ProfilePage />} />
                <Route path="/logout" element={<Logout />}> </Route>
            </Route>
            <Route path="*" element={<h1>404: Page not found </h1>}></Route>
        </Routes>
        </AuthProvider>
    </Router>
  )
}

export default App
