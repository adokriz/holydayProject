import {useNavigate} from 'react-router-dom'
import {useAuth} from "./AuthProvider.jsx";
import logo from "../../img/Gemini_Generated_Image_gaovslgaovslgaov.jpeg"

function Navbar() {
    const navigate = useNavigate();
    const {isAuthenticated, user} = useAuth();

    return (
        <nav className="navbar">
            <img src={logo} alt="SkillCanvasLogo"></img>
            <button className="navbarButton" onClick={() => navigate("/")} type="button" id="navbarToggler"> Home </button>
            {!isAuthenticated ? (<><button className="navbarButton" onClick={() => navigate("/login")}>Login</button>
                    <button className="navbarButton" onClick={() => navigate("/register")}>Register</button>
                </>) :
                (<><button className="navbarButton" onClick={() => navigate("/logout")}>Logout</button>
                    <button className="navbarButton" onClick={() => navigate("/profile/" + user)}>{user}</button>
                </>)}
        </nav>
    )
}

export default Navbar;