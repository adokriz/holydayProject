import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "./AuthProvider.jsx";


function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        logout()
        navigate("/")
    })

    return null;
}
export default Logout;