import {useNavigate} from 'react-router-dom'
import {useAuth} from "./AuthProvider.jsx";


function Navbar() {
    const navigate = useNavigate();
    const {isAuthenticated, user} = useAuth();

    return (
        <nav className="navbar">
            <button className="navbarButton" onClick={() => navigate("/")} type="button" id="navbarToggler"> Home </button>
            {!isAuthenticated ? (<button className="navbarButton" onClick={() => navigate("/login")}>Login</button>) :
                (<><button className="navbarButton" onClick={() => navigate("/logout")}>Logout</button>
                    <button className="navbarButton" onClick={() => navigate("/profile/" + user)}>{user}</button>
                </>)}
        </nav>
    )
}

export default Navbar;