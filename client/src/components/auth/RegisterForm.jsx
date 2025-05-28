import InputForForms from "../elementaryComponents/InputForForms.jsx";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {generalUserQuery} from "../../profilePageFunc.js";
import {CheckCircle, Loader2, XCircle} from "lucide-react";
import './Forms.css'

function Register() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [status, setStatus] = useState('idle')
    const [message, setMessage] = useState('');
    const navigate = useNavigate();


    const validateUsername = async (username) => {
        if (!username.trim()) {
            setStatus('idle');
            setMessage('');
            return;
        }

        if (username.length < 4) {
            setStatus('taken');
            setMessage('Username must be at least 4 characters');
            return;
        }

        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setStatus('taken');
            setMessage('Username can only contain letters, numbers, and underscores');
            return;
        }

        setStatus('checking');
        setMessage('Checking availability...');

        try {
            const response = await generalUserQuery(username, `http://localhost/holyday/sqlQuerier.php`, false)
            if (response.status === 200) {
                setStatus('taken');
                setMessage('Username is already taken');
            } else if(response.status === 404) {
                setStatus('available');
                setMessage('Username is available!');
            }
        } catch (error) {
            setStatus('taken');
            setMessage('Error checking username');
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            validateUsername(formData.username);
        }, 500);

        return () => clearTimeout(timer);
    }, [formData]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        try {
            const response = await axios.post('http://localhost/holyday/register.php', formData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                navigate('/login');
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const getStatusIcon = () => {
        switch (status) {
            case 'checking':
                return <Loader2 className="usernameCheckerIconChecking"/>;
            case 'available':
                return <CheckCircle className="usernameCheckerIconAvailable"/>;
            case 'taken':
                return <XCircle className="usernameCheckerIconTaken"/>;
            default:
                return null;
        }
    };

    return (
        <>
            <h1 className="secondaryTittle">Register:</h1>
            <form className="authForm" action={handleSubmit}>
                <div className={'authMessage ' + status}>
                    {message}
                </div>
                <div className="usernameRegisterContainer">
                <InputForForms classname="usernameInput" nameOfInput='username' onChange={handleChange} typeOfInput='text' placeholder='Username'/>
                <div className="statusIconContainer"> {getStatusIcon()}</div>
                </div>
                <InputForForms nameOfInput='password' onChange={handleChange} typeOfInput='password' placeholder='Password'/>
                <InputForForms nameOfInput='confirmPassword' onChange={handleChange} typeOfInput='password' placeholder='Confirm Password'/>
                <button type="submit">Register</button>
            </form>
        </>
    )
}

export default Register;