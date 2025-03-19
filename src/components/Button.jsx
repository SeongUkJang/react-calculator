import React from 'react'

const Button = ({ value, onClick, className = '' }) => {
    return (

        <button
            className={`btn ${className}`}
            onClick={()=>onClick(value)}
        >
            {value}
        </button>

    )
}

export default Button