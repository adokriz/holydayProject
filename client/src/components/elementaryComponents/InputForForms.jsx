import {useState} from "react";
import "./InputForForms.css";

function InputForForms({nameOfInput, onChange, typeOfInput, placeholder, classname}) {
    const [activeInput, setActiveInput] = useState(null);

    return (
        <input className={`${classname} formInput ${activeInput === nameOfInput ? 'active' : ''}`}
        onChange={onChange}
        onMouseOver={() => setActiveInput(nameOfInput)}
        onBlur={() => setActiveInput(null)}
        onMouseOut={() => setActiveInput(null)}
        name={nameOfInput}
        type={typeOfInput}
        placeholder={placeholder}/>
            )
}

export default InputForForms;