import './LoginForm.css'
import {useState} from "react";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useAuth }  from "./AuthProvider.jsx";


function LoginForm() {
    const [activeInput, setActiveInput] = useState(null);
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        setError('');
        try {
            await axios.post('http://localhost/holyday/login.php', formData, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(response => {
                if (response.status === 200) {
                    login(formData.username);
                    navigate('/profile/' + formData.username);
                }
            })
        }
        catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <h1 className="secondaryTittle">Login:</h1>
            <form className="loginForm" action={handleSubmit}>
                <input className={`formInput ${activeInput === 'username' ? 'active' : ''}`}
                       onChange={handleChange}
                       onMouseOver={() => setActiveInput('username')}
                       onFocus={() => setActiveInput('username')}
                       onBlur={() => setActiveInput(null)}
                       name='username'
                       type='text'
                       placeholder='Username' />

                <input className={`formInput ${activeInput === 'password' ? 'active' : ''}`}
                       onChange={handleChange}
                       onMouseOver={() => setActiveInput('password')}
                       onFocus={() => setActiveInput('password')}
                       onBlur={() => setActiveInput(null)}
                       name='password'
                       type='password'
                       placeholder='Password'/>
                <button type="submit">Login</button>
            </form>
        </>
    )
}

export default LoginForm;