import React from 'react';
import { formBtn3 } from '../../utils/CustomClass';

const GradientButton = ({ 
    children, 
    onClick, 
    className = '', 
    type = 'button',
    disabled = false 
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${formBtn3} gradient-border btn-fade-down ${className}`}
        >
            <span>{children}</span>
        </button>
    );
};

export default GradientButton;
