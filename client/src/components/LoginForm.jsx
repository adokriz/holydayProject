import './LoginForm.css'
import {useState} from "react"
import axios from 'axios'
import {useNavigate} from "react-router-dom"
import { useAuth }  from "./AuthProvider.jsx"
import InputForForms from "./elementaryComponents/InputForForms.jsx"


function LoginForm() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const navigate = useNavigate()
    const { login } = useAuth()

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async () => {
        try {
            await axios.post('http://localhost/holyday/login.php', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(response => {
                if (response.status === 200) {
                    login(formData.username)
                    navigate('/profile/' + formData.username)
                }
            })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <h1 className="secondaryTittle">Login:</h1>
            <form className="loginForm" action={handleSubmit}>
                <InputForForms nameOfInput='username' onChange={handleChange} typeOfInput='text' placeholder='Username'/>
                <InputForForms nameOfInput='password' onChange={handleChange} typeOfInput='password' placeholder='Password'/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm