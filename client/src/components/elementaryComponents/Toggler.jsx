import React, { useState } from 'react';
import './Toggler.css';

const ToggleStrokeWidth = ({offToggleTittle, onToggleTittle, onToggleChange}) => {
    const [isToggled, setIsToggled] = useState(false);

    const handleToggle = () => {
        const newState = !isToggled;
        setIsToggled(newState);

        if (onToggleChange) {
            onToggleChange(newState);
        }
    };

    const toggleText = isToggled ? onToggleTittle : offToggleTittle;

    return (
        <div className="toggle-container">
            <div className="toggle-label">
                <div>{toggleText}</div>
            </div>
            <div className={`toggle-switch ${isToggled ? 'toggled' : ''}`} onClick={handleToggle}>
                <div className="toggle-thumb"></div>
            </div>
        </div>
    );
};

export default ToggleStrokeWidth;
